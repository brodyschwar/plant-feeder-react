import React, { useCallback, useState, MouseEvent } from "react";
import { Divider, Menu, MenuItem } from '@mui/material';
import { XYPosition } from "@xyflow/react";
import { BehaviorTreeNodeMenuLayout } from "../../../utils/nodeMenuSetup";

interface AddNodeItemProps {
    requestNode: ({data, type}: {data: any, type: string}) => void
    data: any,
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
    menuItems: { data: any, type: string }[]
    subMenus: BehaviorTreeNodeMenuLayout[]
    position: XYPosition, 
    addNodeFromMenu: ({data, type}: {data: any, type: string}) => () => void
    handleClose: () => void
}

const AddNodeMenu = (props: AddNodeMenuProps) => {
    const [subMenuProps, setSubMenuProps] = useState<AddNodeMenuProps | null>(null);

    const handleSubMenuClick = useCallback((event: MouseEvent, submenu: BehaviorTreeNodeMenuLayout) => {
        setSubMenuProps({
            menuItems: submenu.nodes,
            subMenus: submenu.nodeFiles,
            position: { x: event.clientX, y: event.clientY },
            addNodeFromMenu: props.addNodeFromMenu,
            handleClose: props.handleClose
        })
    }, [props.handleClose, props.addNodeFromMenu])

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
                props.menuItems.map(({data, type}: {data: any, type: string}) => {
                    return <AddNodeItem key={data.label} data={data} type={type} requestNode={props.addNodeFromMenu({data, type})}/>
                })
            }
            {
                props.menuItems.length > 0 && props.subMenus.length > 0 &&
                <Divider/>
            }
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