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
    const [disabled, setDisabled] = useState<boolean>(false)

    const onChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisabled(false)
        setter(event.target.value)
    }
    
    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            <TextField label="Hostname" sx={{ input: {color: darkTheme.primaryColor}}} value={hostname} onChange={onChange(setHostname)} size="small"/>
            <Typography sx={{color: darkTheme.primaryColor}}>:</Typography>
            <TextField label="Port" sx={{ input: {color: darkTheme.primaryColor}}}  value={port} onChange={onChange(setPort)} size="small"/>
            <Button onClick={() => { setDisabled(true); onConnect({hostname: hostname, port: port}) }} disabled={disabled}>
                CONNECT
            </Button>
        </Box>
    )
}

export default ServerInputLoader
