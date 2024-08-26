import React, { useContext, useEffect, useState } from "react";
import { EditorManagerContext } from "../../../contexts/nodeEditorContext";
import { Box, TextField } from "@mui/material";
import { useReactFlow } from "@xyflow/react";

const NodeInspector = () => {
    const { inspectedNode } = useContext(EditorManagerContext);
    const [ temporaryData, setTemporaryData ] = useState<any>(inspectedNode?.data);
    const { updateNodeData } = useReactFlow();
    useEffect(() => (setTemporaryData(inspectedNode?.data)), [inspectedNode]);

    const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setTemporaryData((prevData: any) => {
            const val = {
                ...prevData,
                [key]: event.target.value
            }
            return val});
    };

    const handleExit = () => {
        if (inspectedNode) {
            updateNodeData(inspectedNode.id, temporaryData)
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.5rem"}}>
            {
                temporaryData &&
                Object.entries(temporaryData).filter(([key, value]) => key !== "label")
                .map(([key, value], index) => 
                    <TextField 
                        fullWidth
                        key={index} 
                        label={key} 
                        variant="outlined"
                        value={value ? value : ""}
                        onChange={handleChange(key)}
                        onBlur={handleExit}
                        size="small"/>
                )
            }
        </Box>
    )
}

export default NodeInspector