import { Box } from "@mui/material";
import React, { useContext } from "react";
import ServerInputLoader, { ServerConnectionProps } from "../serverInputConnection";
import { darkTheme } from "../../themes/themes";
import { FileManagerContext } from "../../contexts/fileManager";

const FileSystemBar = () => {
    const { connectToHost } = useContext(FileManagerContext)
    return (
        <Box sx={{width: "100%", display: "flex", alignItems: "center", background: darkTheme.baseColor, padding: "0.4rem"}}>
            <ServerInputLoader onConnect={connectToHost}/>
        </Box>
    )
}

export default FileSystemBar