import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { darkTheme } from "../../themes/themes";
import ServerInputLoader from "../serverInputConnection";
import { FileManagerContext } from "../../contexts/fileManager";


const EditorMenu = () => {
    const { openFile } = useContext(FileManagerContext)
    return (
        <Box sx={{width: "100%", display: "flex", alignItems: "center", background: darkTheme.baseColor}}>
            <Typography style={{ paddingLeft: "1rem", color: darkTheme.primaryColor, flexGrow: "1"}}>
                {openFile ? openFile.fullName : ""}
            </Typography>
            <ServerInputLoader onConnect={() => {}}/>
        </Box>
    );
};

export default EditorMenu