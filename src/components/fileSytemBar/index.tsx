import { Box } from "@mui/material";
import React from "react";
import ServerInputLoader, { ServerConnectionProps } from "../serverInputConnection";
import { darkTheme } from "../../themes/themes";

const FileSystemBar = () => {
    const onConnect = (props: ServerConnectionProps) => {}
    return (
        <Box sx={{width: "100%", display: "flex", alignItems: "center", background: darkTheme.baseColor, padding: "0.4rem"}}>
            <ServerInputLoader onConnect={onConnect}/>
        </Box>
    )
}

export default FileSystemBar