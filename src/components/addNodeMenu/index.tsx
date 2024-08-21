import React, { useCallback, useContext, useState, MouseEvent } from "react";
import { Divider, Menu, MenuItem } from '@mui/material';
import { useReactFlow, XYPosition } from "@xyflow/react";
import { EditorManagerContext } from "../../contexts/nodeEditorContext";
import { BehaviorTreeNode, BehaviorTreeNodeMenuLayout } from "../../data";

interface AddNodeItemProps {
    requestNode: ({data, type}: {data: BehaviorTreeNode, type: string}) => void
    data: BehaviorTreeNode,
    type: string
}

const AddNodeItem = (props: AddNodeItemProps) => {
    const createNode = () => {
        props.requestNode({ data: props.data, type: props.type })
    }
    return (
        <MenuItem onClick={createNode}>{props.data.label}</MenuItem>
    )
}

interface AddNodeMenuProps {
    menuItems: { data: BehaviorTreeNode, type: string }[]
    subMenus: BehaviorTreeNodeMenuLayout[]
    position: XYPosition, 
    handleClose: () => void
}

const AddNodeMenu = (props: AddNodeMenuProps) => {
    const { addNodes, screenToFlowPosition } = useReactFlow()
    const [subMenuProps, setSubMenuProps] = useState<AddNodeMenuProps | null>(null);
    const { generateId } = useContext(EditorManagerContext)
    const addCompositeNode = useCallback(
        ({data, type}: {data: any, type: string}) => {
            addNodes({ 
                id: generateId(), 
                data: data, 
                position: screenToFlowPosition(props.position),
                type: type 
            })
            props.handleClose()
        },
        [addNodes, props, screenToFlowPosition, generateId]
    );

    const handleSubMenuClick = useCallback((event: MouseEvent, submenu: BehaviorTreeNodeMenuLayout) => {
        setSubMenuProps({
            menuItems: submenu.nodes,
            subMenus: submenu.nodeFiles,
            position: { x: event.clientX, y: event.clientY },
            handleClose: props.handleClose
        })
    }, [props.handleClose])

    return (
        <div>
        <Menu
            id="simple-menu"
            anchorReference='anchorPosition'
            anchorPosition={{top: props.position.y, left: props.position.x}}
            open={Boolean(props.position)}
            onClose={props.handleClose}
            >
            {
                props.menuItems.map(({data, type}: {data: BehaviorTreeNode, type: string}) => {
                    return <AddNodeItem key={data.label} data={data} type={type} requestNode={addCompositeNode}/>
                })
            }
            <Divider/>
            {
                props.subMenus.map((submenu: BehaviorTreeNodeMenuLayout) => {
                    return <MenuItem key={submenu.name} onClick={(event: MouseEvent) => {handleSubMenuClick(event, submenu)}}>
                        {submenu.name}
                    </MenuItem>
                })
            }
        </Menu>
        { 
            subMenuProps &&
            <AddNodeMenu {...subMenuProps}/>
        }
        </div>
    );
}

export default AddNodeMenu