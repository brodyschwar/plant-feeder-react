import React from "react"
import { Box, capitalize, TextField, Tooltip } from "@mui/material"

const DisplayItem = ({name, value} : {name: string, value: string}) => {
    return (
        <Tooltip key={name} title={value}>
            <TextField
                        disabled
                        label={capitalize(name)} 
                        variant="outlined"
                        value={value ? value : ""}
                        size="small"/>
        </Tooltip>
    )
}

const DynamicDisplay=({data} : { data: any}) => {
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
            {
            Object.entries(data).filter(([key, value]) => key !== "label" && value)
            .map(([key, value]) => {
                return <DisplayItem key={key} name={key} value={String(value)}/>
            })
            }
        </Box>
        
    )
}

export default DynamicDisplay