import { type Node, type Edge, isEdge, isNode } from "@xyflow/react"

export interface NodeEditorFile {
    nodes: Node[],
    edges: Edge[]
}

export function isNodeEditorFile(obj: any): obj is NodeEditorFile {
    if (typeof obj !== 'object' || obj === null) {
        console.log(obj);
        return false;
    }
    if (!Array.isArray(obj.nodes) || !obj.nodes.every(isNode)) {
        console.log(obj);
        return false;
    }
    if (!Array.isArray(obj.edges) || !obj.edges.every(isEdge)) {
        console.log(obj);
        return false;
    }
    return true;
}


export const BEHAVIOR_TREE_TEMPLATE: NodeEditorFile = {
    nodes: [{ id: 'root', type: 'rootNode', data: { label: 'Root' }, position: { x: 5, y: 5 }, deletable: false}],
    edges: []
}