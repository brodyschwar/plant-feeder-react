import { Box, Breadcrumbs, Button } from "@mui/material";
import React, { useContext } from "react";
import ServerInputLoader from "../../serverInputConnection";
import { darkTheme } from "../../../themes/themes";
import { FileManagerContext } from "../../../contexts/fileManager";
import { Folder } from "../../../contexts/fileManager";

const FileSystemBar = ({directoryStack, setCurrentDirectory}: {directoryStack: Folder[], setCurrentDirectory: (folder: Folder) => void}) => {
    const { connectToHost } = useContext(FileManagerContext)
    return (
        <Box sx={{width: "100%", display: "flex", alignItems: "center", background: darkTheme.baseColor}}>
            <Breadcrumbs sx={{flexGrow: "1"}}>
                {directoryStack.length !== 0 &&
                directoryStack.map((folder: Folder, index) => (
                    <Button 
                        sx={{textTransform: 'none'}} 
                        key={index} 
                        onClick={() => setCurrentDirectory(folder)} 
                        >
                        {folder.name}
                    </Button>
                ))
                }
            </Breadcrumbs>
            <ServerInputLoader onConnect={connectToHost}/>
        </Box>
    )
}

export default FileSystemBar