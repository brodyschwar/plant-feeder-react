import React, { useCallback, useContext, useMemo, useState } from "react";
import { Button, Modal, Paper, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField } from "@mui/material";
import { Folder as FolderIcon, AccountTree } from "@mui/icons-material";
import { FileManagerContext, Folder, useBehaviorTreeTemplate } from "../../../contexts/fileManager";

interface AddFileModalProps {
    type: string,
    open: boolean,
    validate:  (path: string) => boolean
    onSubmit: (path: string) => void
    handleClose: () => void
}

const AddFileModal = (props: AddFileModalProps) => {
    const [fileName, setFileName] = useState("");
    const [isValid, setIsValid] = useState(true);

    const onClick = useCallback(() => {
        const valid = props.validate(fileName);
        setIsValid(valid)
        if (valid){
            props.onSubmit(fileName)
            props.handleClose()
        }
    }, [fileName, props])

    return (
        <Modal sx={{top: "45%", left:"45%"}} open={props.open} onClose={props.handleClose}>
            <Paper sx={{padding: "1rem", width: "fit-content", display: "flex", flexDirection:"column", alignItems:"center"}}>
                <h2>{`Create ${props.type}`}</h2>
                <TextField error={!isValid} label={`${props.type} Name`} value={fileName} onChange={(event) => setFileName(event.target.value)}/>
                {!isValid && <p>Name is not valid</p>}
                <Button onClick={onClick}>ADD</Button>
            </Paper>
        </Modal>
    )
}

const AddFileBar = ({display, currentDirectory}: {display: boolean, currentDirectory: Folder}) => {
    const [modalProps, setModalProps] = useState<AddFileModalProps | null>(null)
    const makeFile = useBehaviorTreeTemplate();
    const { makeDir } = useContext(FileManagerContext);

    const validateFilename = useCallback((fileName: string) => {
        const regex = /^[^\s/]+\.json$/i;
        return regex.test(fileName) && currentDirectory.files.findIndex(file => file.name === fileName) === -1
    }, [currentDirectory.files])
    const validateFoldername = useCallback((folderName: string) => {
        const regex = /^[^\s/.]+$/;
        return regex.test(folderName) && currentDirectory.folders.findIndex(folder => folder.name === folderName) === -1
    }, [currentDirectory.folders])

    const handleClose = useCallback(() => {
        setModalProps(null)
    }, [])

    const addFileModalProps: AddFileModalProps = useMemo(() => {
        return {
            type: "File",
            open: true,
            validate: validateFilename,
            onSubmit: (filename) => makeFile(filename),
            handleClose: handleClose
        }
    }, [validateFilename, handleClose, makeFile])

    const addFolderModalProps: AddFileModalProps = useMemo(() => {
        return {
            type: "Folder",
            open: true,
            validate: validateFoldername,
            onSubmit: (foldername: string) => makeDir(currentDirectory.fullName + "/" + foldername),
            handleClose: handleClose
        }
    }, [validateFoldername, handleClose, currentDirectory.fullName, makeDir])

    const handleClick = (props: AddFileModalProps) => () => {
        setModalProps(props)
    }
    
    return (
        <>
        <SpeedDial
            ariaLabel='File adding speed dial'
            direction='down'
            icon={<SpeedDialIcon/>}>
            <SpeedDialAction onClick={handleClick(addFolderModalProps)} icon={<FolderIcon/>} tooltipTitle={"New Folder"}/>
            <SpeedDialAction onClick={handleClick(addFileModalProps)} icon={<AccountTree/>} tooltipTitle={"New Behavior Tree"}/>
        </SpeedDial>
        { modalProps && <AddFileModal {...modalProps}/> }
        </>
    )
}

export default AddFileBar