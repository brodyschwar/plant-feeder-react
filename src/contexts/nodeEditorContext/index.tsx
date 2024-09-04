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
    type Node,
    type Edge
} from "@xyflow/react"
import { NodeEditorFile } from "../../data/templates"
import { FileManagerContext } from "../fileManager"

interface EditorManagerData {
    generateId: () => string,
    setInspectedNode: (node: Node) => void,
    inspectedNode: Node | null,
    setSelected: ({nodes, edges}: {nodes: Node[], edges: Edge[]}) => void,
    saveData: () => void,
    copy: () => void,
    paste: () => void
}

const emptyEditorManagerData: EditorManagerData = {
    generateId: () => "f",
    setInspectedNode: (_) => {},
    inspectedNode: null,
    setSelected: ({nodes, edges}) => {},
    saveData: () => {},
    copy: () => {},
    paste: () => {}
}

export const EditorManagerContext: Context<EditorManagerData> = createContext(emptyEditorManagerData)

const EditorManagerProvider = ({children}: {children: ReactNode}) => {
    const [inspectedNode, setInspectedNode] = useState<null | Node>(null)
    const { getNodes, getEdges, getNode, getEdge, addEdges, addNodes } = useReactFlow()
    const { save } = useContext(FileManagerContext)
    const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
    const [selectedEdges, setSelectedEdges] = useState<string[]>([]);
    const [clipboardNodes, setClipboardNodes] = useState<null | Node[]>(null)
    const [clipboardEdges, setClipboardEdges] = useState<null | Edge[]>(null)
    
    const setSelected = useCallback(({ nodes, edges }: {nodes: Node[], edges: Edge[]}) => {
        setSelectedNodes(nodes.map((node) => node.id));
        setSelectedEdges(edges.map((edge) => edge.id));
    }, []);
    
    const generateId: () => string = useCallback(
        () => {
            return `${Date.now()}_${Math.floor(Math.random()*100)}`
        },
        []
    )

    const copy = useCallback(() => {
        setClipboardNodes(
            selectedNodes.map(value => getNode(value))
            .filter((node): node is Node => node !== undefined)
        )
        setClipboardEdges(
            selectedEdges.map(value => getEdge(value))
            .filter((edge): edge is Edge => edge !== undefined)
            .filter((edge) => selectedNodes.some(nodeId => nodeId === edge.source) || selectedNodes.some(nodeId => nodeId === edge.target))
        )
        console.log('copying')
        console.log(selectedNodes)
    }, [selectedNodes, selectedEdges, getNode, getEdge])

    const paste = useCallback(() => {
        if (clipboardNodes === null || clipboardEdges === null) return
        const idPrefix = generateId()
        const nodes: Node[] = clipboardNodes.map((node: Node) => ({
            ...node,
            id: idPrefix+node.id
        }))
        const edges: Edge[] = clipboardEdges.map((edge: Edge) => ({
            ...edge,
            source: idPrefix+edge.source,
            target: idPrefix+edge.target,
            id: idPrefix+edge.id
        }))

        addEdges(edges)
        addNodes(nodes)
        
    }, [clipboardEdges, clipboardNodes, generateId, addEdges, addNodes])

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
            setSelected,
            setInspectedNode,
            saveData,
            copy,
            paste}}>
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