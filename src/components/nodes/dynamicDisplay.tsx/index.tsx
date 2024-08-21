import React from "react"
import { capitalize, List, ListItem, ListItemText } from "@mui/material"

const DisplayItem = ({name, value} : {name: string, value: string}) => {
    return (
        <ListItem key={name}>
            <ListItemText primary={`${capitalize(name)}: ${value}`}/>
        </ListItem>
    )
}

const DynamicDisplay=({data} : { data: any}) => {
    return (
        <div>
            <List dense>
            {
                Object.entries(data).filter(([key, value]) => key !== "label" && value)
                .map(([key, value]) => {
                    return <DisplayItem key={key} name={key} value={String(value)}/>
                })
            }
            </List>
        </div>
        
    )
}

export default DynamicDisplay