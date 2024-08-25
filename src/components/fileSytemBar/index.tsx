import { Box, Button, styled, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { darkTheme } from "../../themes/themes";

const StyledTextField = styled(
    TextField)(() => ({
        padding: "0",
        input: {
        color: darkTheme.primaryColor,
        },
  }));

const FileSystemBar = () => {
    const [hostname, setHostname] = useState<string>("");
    const [port, setPort] = useState<string>("");
    
    return (
        <Box sx={{ width: "100%", display: "flex", background: darkTheme.baseColor, padding: "1rem", alignItems: "center"}}>
            <TextField label="Hostname" sx={{ minWidth: "0", input: {color: darkTheme.primaryColor}}} value={hostname} color="secondary" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHostname(event.target.value)} size="small"/>
            <Typography sx={{color: darkTheme.primaryColor}}>:</Typography>
            <StyledTextField label="Port" value={port} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPort(event.target.value)} size="small"/>
            <Button>Connect</Button>
        </Box>
    )
}

export default FileSystemBar