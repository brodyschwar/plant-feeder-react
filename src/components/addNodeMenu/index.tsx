import React, { useCallback, useContext } from "react";
import { Divider, Menu, MenuItem } from '@mui/material';
import { Position, useReactFlow, XYPosition } from "@xyflow/react";
import { EditorManagerContext } from "../../contexts/nodeEditorContext";

const AddNodeMenu = (props: {position: XYPosition, handleClose: () => void }) => {
    const { addNodes, screenToFlowPosition } = useReactFlow()
    const { generateId } = useContext(EditorManagerContext)
    const addCompositeNode = useCallback(
        () => {
            addNodes({ 
                id: generateId(), 
                data: { label: 'Node 1' }, 
                position: screenToFlowPosition(props.position),
                type: "compositeNode" 
            })
            props.handleClose()
        },
        [addNodes, props, screenToFlowPosition, generateId]
    );

    return (
        <Menu
            id="simple-menu"
            anchorReference='anchorPosition'
            anchorPosition={{top: props.position.y, left: props.position.x}}
            open={Boolean(props.position)}
            onClose={props.handleClose}
            >
                <MenuItem onClick={addCompositeNode}>Add Composite Node</MenuItem>
                <Divider/>
                <MenuItem>Option 2</MenuItem>
                <MenuItem>Option 3</MenuItem>
                <MenuItem>Option 4</MenuItem>
        </Menu>
    );
}

export default AddNodeMenu