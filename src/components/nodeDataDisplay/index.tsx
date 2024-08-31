import React, { useCallback, useEffect, useState } from "react";
import { 
    Box, 
    FormControlLabel, 
    TextField, 
    Tooltip, 
    capitalize, 
    Checkbox 
} from "@mui/material";
import { useReactFlow } from "@xyflow/react";

const StringDisplayItem = ({name, value, disabled, setValue} : {name: string, value: string, disabled: boolean, setValue: (val: any) => void}) => {
    const [tempVal, setTempVal] = useState(value)
    useEffect(() => setTempVal(value), [value])
    return (
        <Tooltip key={name} title={value}>
            <TextField
                disabled={disabled}
                label={capitalize(name)} 
                variant="outlined"
                value={tempVal}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTempVal(event.target.value)}
                onBlur={() => setValue(tempVal)}
                size="small"/>
        </Tooltip>
    )
}

const BoolDisplayItem = ({name, value, disabled, setValue} : {name: string, value: boolean, disabled: boolean, setValue: (val: any) => void}) => {
    const [isChecked, setIsChecked] = useState(value)
    useEffect(() => setIsChecked(value), [value])
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.checked)
        setIsChecked(event.target.checked)
    },[setValue])
    return (
        <FormControlLabel
            control={
                <Checkbox
                    disabled={disabled}
                    checked={isChecked} 
                    onChange={handleChange}
                    />
            }
            label={capitalize(name)}/>
    )
}

const NodeDataDisplay = ({id, data, disabled, hiddenKeys = []}: {id: string, data: any, disabled?: boolean, hiddenKeys: string[]}) => {
    const { updateNodeData } = useReactFlow();

    const updateData = useCallback((key: string) => (val: any) => {
        updateNodeData(id, {
            ...data,
            [key]: val
        })
    }, [updateNodeData, id, data])

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
            {
                Object.entries(data).filter(([key, value]) => !hiddenKeys.some(hk => key === hk))
                .map(([key, value]) => {
                    if (typeof(value) === 'string') {
                        return <StringDisplayItem key={key+id} disabled={!!disabled} name={key} value={value} setValue={updateData(key)}/>
                    } else if (typeof(value) === 'boolean') {
                        return <BoolDisplayItem key={key+id} disabled={!!disabled} name={key} value={value} setValue={updateData(key)}/>
                    } else {
                        return <StringDisplayItem key={key+id} disabled={!!disabled} name={key} value={value ? String(value) : ""} setValue={updateData(key)}/>
                    }
                })
            }
        </Box>
    )
}

export default NodeDataDisplay