import React, { 
    ReactNode, 
    Context, 
    createContext, 
    useState, 
    useCallback, 
    useContext 
} from "react"
import { 
    ReactFlowProvider,  
    useReactFlow,  
    type Node
} from "@xyflow/react"
import { NodeEditorFile } from "../../data/templates"
import { FileManagerContext } from "../fileManager"

interface EditorManagerData {
    generateId: () => string,
    setInspectedNode: (node: Node) => void,
    inspectedNode: Node | null,
    saveData: () => void
}

const emptyEditorManagerData: EditorManagerData = {
    generateId: () => "f",
    setInspectedNode: (_) => {},
    inspectedNode: null,
    saveData: () => {}
}

export const EditorManagerContext: Context<EditorManagerData> = createContext(emptyEditorManagerData)

const EditorManagerProvider = ({children}: {children: ReactNode}) => {
    const [inspectedNode, setInspectedNode] = useState<null | Node>(null)
    const { getNodes, getEdges } = useReactFlow()
    const { save } = useContext(FileManagerContext)
    const generateId: () => string = useCallback(
        () => {
            return `${Date.now()}_${Math.floor(Math.random()*100)}`
        },
        []
    )

    const saveData = useCallback(() => {
        const data: NodeEditorFile = {
            nodes: getNodes(),
            edges: getEdges()
        }
        save(data)
    }, [getNodes, getEdges, save])

    return (
        <EditorManagerContext.Provider value={{ 
            generateId,
            inspectedNode,
            setInspectedNode,
            saveData}}>
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