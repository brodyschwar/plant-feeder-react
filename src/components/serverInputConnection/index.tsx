import React, { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { darkTheme } from "../../themes/themes"

export interface ServerConnectionProps {
    hostname: string,
    port: string
}

const ServerInputLoader = ({onConnect} : {onConnect: (props: ServerConnectionProps) => void}) => {
    const [hostname, setHostname] = useState<string>("");
    const [port, setPort] = useState<string>("");
    
    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            <TextField label="Hostname" sx={{ input: {color: darkTheme.primaryColor}}} value={hostname} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHostname(event.target.value)} size="small"/>
            <Typography sx={{color: darkTheme.primaryColor}}>:</Typography>
            <TextField label="Port" sx={{ input: {color: darkTheme.primaryColor}}}  value={port} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPort(event.target.value)} size="small"/>
            <Button onClick={() => onConnect({hostname: hostname, port: port})}>Connect</Button>
        </Box>
    )
}

export default ServerInputLoader
