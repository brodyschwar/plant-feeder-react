import React, { ReactNode, Context, createContext, useState, useCallback, useContext } from "react"
import { 
    ReactFlowProvider, useNodes, useNodesState, useReactFlow, type Node } from "@xyflow/react"

interface EditorManagerData {
    generateId: () => string,
    setInspectedNode: (node: Node) => void,
    inspectedNode: Node | null
}

const emptyEditorManagerData: EditorManagerData = {
    generateId: () => "f",
    setInspectedNode: (_) => {},
    inspectedNode: null
}

export const EditorManagerContext: Context<EditorManagerData> = createContext(emptyEditorManagerData)

const EditorManagerProvider = ({children}: {children: ReactNode}) => {
    const [inspectedNode, setInspectedNode] = useState<null | Node>(null)
    const { getNodes } = useReactFlow()
    const generateId: () => string = useCallback(
        () => {
            var id = "";
            var unique = false;
            while (!unique) {
                id = `${Date.now()}_${Math.floor(Math.random()*100)}`
                unique = !getNodes().some((node) => node.id === id)
            }
            return id
        },
        [getNodes]
    )
    return (
        <EditorManagerContext.Provider value={{ 
            generateId: generateId,
            inspectedNode: inspectedNode,
            setInspectedNode: setInspectedNode}}>
            {children}
        </EditorManagerContext.Provider>
    )
}

const NodeEditorContextProvider = ({children}: {children: ReactNode}) => {
    return (
        <ReactFlowProvider>
            <EditorManagerProvider>
                {children}
            </EditorManagerProvider>
        </ReactFlowProvider>
    )
}

export default NodeEditorContextProvider