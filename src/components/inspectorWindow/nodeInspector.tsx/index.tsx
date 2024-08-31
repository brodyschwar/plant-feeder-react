import React, { useContext } from "react";
import { EditorManagerContext } from "../../../contexts/nodeEditorContext";
import NodeDataDisplay from "../../nodeDataDisplay";
import { Box } from "@mui/material";

const NodeInspector = () => {
    const { inspectedNode } = useContext(EditorManagerContext);
    return (
        <Box sx={{padding: "0.5rem"}}>
        {inspectedNode && <NodeDataDisplay hiddenKeys={[]} id={inspectedNode.id} data={inspectedNode?.data}/>}
        </Box>
    )
}

export default NodeInspector