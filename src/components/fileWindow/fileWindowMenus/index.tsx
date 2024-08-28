import React, { useContext } from "react";
import { Menu, MenuItem } from "@mui/material";
import { FileManagerContext, Folder, File } from "../../../contexts/fileManager";

interface FolderMenuProps {
    menuPosition: {x: number, y: number}, 
    folder: Folder, 
    handleClose: () => void, 
    open: (folder: Folder) => () => void
}

export const FolderMenu = (props: FolderMenuProps) => {
    const { deletePath } = useContext(FileManagerContext)
    return (
        <Menu
            open
            onClose={props.handleClose}
            onClick={props.handleClose}
            id="file-menu"
            anchorReference='anchorPosition'
            anchorPosition={{top: props.menuPosition.y, left: props.menuPosition.x}}
            >
            <MenuItem onClick={props.open(props.folder)}>Open</MenuItem>
            <MenuItem onClick={() => deletePath(props.folder)}>Delete</MenuItem>
        </Menu>
    )
}

interface FileMenuProps {
    menuPosition: {x: number, y: number}, 
    file: File, 
    handleClose: () => void, 
    open: (file: File) => () => void
}

export const FileMenu = (props: FileMenuProps) => {
    const { deletePath } = useContext(FileManagerContext)
    return (
        <Menu
            open
            onClose={props.handleClose}
            onClick={props.handleClose}
            id="file-menu"
            anchorReference='anchorPosition'
            anchorPosition={{top: props.menuPosition.y, left: props.menuPosition.x}}
            >
            <MenuItem onClick={props.open(props.file)}>Open</MenuItem>
            <MenuItem onClick={() => deletePath(props.file)}>Delete</MenuItem>
        </Menu>
    )
}