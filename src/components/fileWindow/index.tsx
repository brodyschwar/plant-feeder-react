import React, { useContext, useEffect, useState, MouseEvent } from 'react';
import styled from '@emotion/styled';
import { darkTheme } from '../../themes/themes';
import { FileManagerContext, Folder, File } from '../../contexts/fileManager';
import { Button, Box } from '@mui/material';
import { AccountTree, Folder as FolderIcon } from '@mui/icons-material';
import FileSystemBar from './fileSytemBar';
import AddFileBar from './addFileBar';
import { FileMenu, FolderMenu } from './fileWindowMenus';

const ItemDisplay = ({name, type, openMenu}: {name: string, type: "tree" | "folder", openMenu: (event: MouseEvent<HTMLButtonElement>) => void}) => {
    return (
        <Button sx={{ height: 'fit-content', minWidth: "10rem", justifyContent: "left", textTransform: "none", gap: "1rem"}} onClick={openMenu}>
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

const reconcileDirectoryStack = (oldStack: Folder[], newFilseStructure: Folder): Folder[] => {
    function getSubFolderIndex(folder: Folder, subfolder: Folder): number {
        return folder.folders.findIndex((dir: Folder) => dir.fullName === subfolder.fullName)
    }

    var newStack: Folder[] = [newFilseStructure]
    var i = 1
    while(i < oldStack.length) {
        const index = getSubFolderIndex(newStack[newStack.length-1], oldStack[i])
        if (index === -1) break;
        newStack.push(newStack[newStack.length-1].folders[index]);
        i += 1;
    }
    return newStack
}

const FileWindow = () => {
    const [directoryStack, setDirectoryStack] = useState<Folder[]>([])
    const { fileStructure } = useContext(FileManagerContext)
    const [menuPosition, setMenuPosition] = useState<null | {x: number, y: number}>(null)
    const [focusFile, setFocusFile] = useState<File | null>(null)
    const [focuseDir, setFocusDir] = useState<Folder | null>(null)

    useEffect(() => {
        if (fileStructure !== null) {
            setDirectoryStack((oldStack) => reconcileDirectoryStack(oldStack, fileStructure));
        } else {
            setDirectoryStack([]);
        }
    }, [fileStructure])

    const reopenFolder = (folder: Folder) => {
        const index = directoryStack.findIndex((directory) => directory.fullName === folder.fullName);
        if (index !== undefined) {
            setDirectoryStack((stack) => stack.slice(0, index+1));
        }
    }

    const openFileMenu = (file: File) => (event: MouseEvent<HTMLButtonElement>) => {
        setMenuPosition({x: event.clientX, y: event.clientY});
        setFocusFile(file)
    }

    const openFolderMenu = (folder: Folder) => (event: MouseEvent<HTMLButtonElement>) => {
        setMenuPosition({x: event.clientX, y: event.clientY});
        setFocusDir(folder)
    }

    const handleClose = () => {
        setMenuPosition(null)
        setFocusDir(null)
        setFocusFile(null)
    }

    const openFolder = (folder: Folder) => () => {
        setDirectoryStack((stack: Folder[]) => [...stack, folder])
    }

    return (
        <Wrapper>
            <FileSystemBar directoryStack={directoryStack} setCurrentDirectory={reopenFolder}/>
            <Box sx={{display: 'flex', flexDirection: "row", padding: "1rem", gap: "1rem"}}>
                {directoryStack.length !== 0 &&
                <AddFileBar display={directoryStack.length !== 0} currentDirectory={directoryStack[directoryStack.length-1]}/>
                }
            <Box sx={{display: "flex", flexFlow: "row wrap"}}>
                { directoryStack.length !== 0 &&
                directoryStack[directoryStack.length-1].folders.map((folder: Folder, index) => (
                    <ItemDisplay key={index} name={folder.name} type={'folder'} openMenu={openFolderMenu(folder)}/>
                ))
                }
                { directoryStack.length !== 0 &&
                directoryStack[directoryStack.length-1].files.map((file: File, index) => (
                    <ItemDisplay key={index} name={file.name} type={'tree'} openMenu={openFileMenu(file)}/>
                ))
                }
                { menuPosition && focuseDir &&
                    <FolderMenu
                        menuPosition={menuPosition}
                        folder={focuseDir}
                        handleClose={handleClose}
                        open={openFolder}/>
                }
                { menuPosition && focusFile &&
                    <FileMenu
                        menuPosition={menuPosition}
                        file={focusFile}
                        handleClose={handleClose}
                        open={(f: File) => () => {}}/>
                }
            </Box>
            </Box>
        </Wrapper>
        
    )
}

export default FileWindow