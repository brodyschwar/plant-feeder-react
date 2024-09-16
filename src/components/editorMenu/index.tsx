import React, { useContext } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { darkTheme } from "../../themes/themes";
import ServerInputLoader from "../serverInputConnection";
import { FileManagerContext } from "../../contexts/fileManager";
import { EditorManagerContext } from "../../contexts/nodeEditorContext";
import { SaveAlt } from "@mui/icons-material";


const EditorMenu = () => {
    const { openFile } = useContext(FileManagerContext)
    const { saveData } = useContext(EditorManagerContext)
    return (
        <Box sx={{width: "100%", display: "flex", alignItems: "center", background: darkTheme.baseColor}}>
            { openFile && <Tooltip title={"Save"}><IconButton color="primary" onClick={saveData}><SaveAlt/></IconButton></Tooltip>}
            <Typography style={{ paddingLeft: "1rem", color: darkTheme.primaryColor, flexGrow: "1"}}>
                {openFile ? openFile.fullName : ""}
            </Typography>
            <ServerInputLoader onConnect={() => {}}/>
        </Box>
    );
};

export default EditorMenu