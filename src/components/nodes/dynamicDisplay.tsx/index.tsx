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
        <List dense>
            {
                Object.entries(data).map(([key, value]) => {
                    return <DisplayItem key={key} name={key} value={String(value)}/>
                })
            }
        </List>
    )
}

export default DynamicDisplay