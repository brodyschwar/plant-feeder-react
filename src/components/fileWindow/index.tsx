import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { darkTheme } from '../../themes/themes';
import { FileManagerContext, Folder, File } from '../../contexts/fileManager';
import { Button, Box } from '@mui/material';
import { AccountTree, Folder as FolderIcon } from '@mui/icons-material';
import FileSystemBar from './fileSytemBar';

const ItemDisplay = ({name, type, clickHandler}: {name: string, type: "tree" | "folder", clickHandler: () => void}) => {
    return (
        <Button sx={{minWidth: "10rem", justifyContent: "left", textTransform: "none", gap: "1rem"}} onDoubleClick={clickHandler}>
            { type === 'tree' && <AccountTree/>}
            { type === 'folder' && <FolderIcon/>}
            {name}
        </Button>
    )
}

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    background: ${ darkTheme.degreeTwo };
    display: flex;
    flex-direction: column;
`

const FileWindow = () => {
    const [directoryStack, setDirectoryStack] = useState<Folder[]>([])
    const { fileStructure } = useContext(FileManagerContext)

    useEffect(() => {
        if (fileStructure !== null) {
            setDirectoryStack([fileStructure]);
        } else {
            setDirectoryStack([]);
        }
    }, [fileStructure])

    const onClick = (folder: Folder) => () => {
        setDirectoryStack((stack: Folder[]) => [...stack, folder])
    }

    const reopenFolder = (folder: Folder) => {
        const index = directoryStack.findIndex((directory) => directory.fullName === folder.fullName);
        if (index !== undefined) {
            setDirectoryStack((stack) => stack.slice(0, index+1));
        }
    }
    return (
        <Wrapper>
            <FileSystemBar directoryStack={directoryStack} setCurrentDirectory={reopenFolder}/>
            <Box sx={{display: "flex", flexFlow: "row wrap"}}>
                { directoryStack.length !== 0 &&
                directoryStack[directoryStack.length-1].folders.map((folder: Folder, index) => (
                    <ItemDisplay key={index} name={folder.name} type={'folder'} clickHandler={onClick(folder)}/>
                ))
                }
                { directoryStack.length !== 0 &&
                directoryStack[directoryStack.length-1].files.map((file: File, index) => (
                    <ItemDisplay key={index} name={file.name} type={'tree'} clickHandler={() => {}}/>
                ))
                }
            </Box>
        </Wrapper>
        
    )
}

export default FileWindow