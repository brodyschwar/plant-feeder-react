import { XYPosition, useReactFlow } from "@xyflow/react";
import { useCallback, useContext } from "react";
import { EditorManagerContext } from "../../contexts/nodeEditorContext";

export const useAddNodeFromMenu = (handleClose: () => void) => {
    const { generateId } = useContext(EditorManagerContext)
    const { addNodes, addEdges, screenToFlowPosition } = useReactFlow()

    const addNodeFromMenu = useCallback((position: XYPosition, connectingNodeId: string | null) => ({data, type}: {data: any, type: string}) => () => {
        const nodeId = generateId()
        addNodes({ 
            id: nodeId, 
            data: data, 
            position: screenToFlowPosition(position),
            type: type 
        })

        if (connectingNodeId !== null) {
            addEdges({ id: nodeId, source: connectingNodeId, target: nodeId })
        }

        handleClose()
    }, [addNodes, addEdges, generateId, screenToFlowPosition, handleClose])

    return addNodeFromMenu
}
