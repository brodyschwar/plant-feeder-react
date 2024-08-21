interface BehavioralTreeNodeMenuLayout {
    name: string,
    nodes: { name: string, data: BehavioralTreeNode, type: string }[],
    nodeFiles: BehavioralTreeNodeMenuLayout[]
}

interface BehavioralTreeNode {
    label: string
}

const NODE_MENU_LAYOUT: BehavioralTreeNodeMenuLayout = {
    name: "Behaviors",
    nodes: [],
    nodeFiles: [
        {
            name: "On Relay Off",
            nodes: [],
            nodeFiles: []
        }
    ]
}