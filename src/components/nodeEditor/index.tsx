import React, { 
    useState, 
    useCallback,
    MouseEvent, 
    useRef,
    useContext
} from 'react';
import styled from '@emotion/styled';
import { lightTheme } from '../../themes/themes';
import { 
    ReactFlow, 
    addEdge,
    type Node,
    type FitViewOptions,
    type OnConnect,
    type DefaultEdgeOptions,
    type NodeTypes,
    useNodesState,
    useEdgesState,
    type XYPosition,
    type OnConnectEnd,
    type OnConnectStart,
    NodeMouseHandler,
    Background,
    BackgroundVariant
} from '@xyflow/react';
import { 
    RootNode, 
    CompositeNode, 
    BehaviorNode,
    DecoratorNode
} from '../nodes';
import AddNodeMenu from '../addNodeMenu';
import { EditorManagerContext } from '../../contexts/nodeEditorContext';

const Editor = styled.div`
    background: ${ lightTheme.backgroundColor };
    flex: auto;
    width: 100%;
`

const initialNodes: Node[] = [
    {
        id: 'provider-1',
        type: 'rootNode',
        data: { label: 'Root' },
        position: { x: 5, y: 5 },
      }
]

const fitViewOptions: FitViewOptions = {
    padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: false,
};

const nodeTypes: NodeTypes = { 
    rootNode: RootNode, 
    compositeNode: CompositeNode,
    behaviorNode: BehaviorNode,
    decoratorNode: DecoratorNode
}
   

const NodeEditor = () => {
    const connectingNodeId = useRef<string | null>(null);
    const [position, setPosition] = useState<XYPosition | null>(null);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const { setInspectedNode } = useContext(EditorManagerContext)

    const onConnect: OnConnect = useCallback(
        (params) => {
            connectingNodeId.current = null
            setEdges((els) => addEdge(params, els))
        },
        [],
    );

    const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
            connectingNodeId.current = nodeId;
        }, []
    );

    const onConnectEnd: OnConnectEnd = useCallback(
        (event) => {
          if (!connectingNodeId.current) return;
          if (event instanceof globalThis.MouseEvent) {
            setPosition({ x: event.clientX, y: event.clientY})
          } 
        },
        [],
    );

    const onDoubleClick = (event: MouseEvent<HTMLElement>) => {
        setPosition({ x: event.clientX, y: event.clientY });
    }

    const handleClose = () => {
        setPosition(null);
    }

    const onNodeDoubleClicked: NodeMouseHandler<Node> = (event: React.MouseEvent, node: Node) => {
        event.stopPropagation()
        console.log(node)
        setInspectedNode(node);
    }

    return (
        <Editor>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                onConnect={onConnect}
                onNodeDoubleClick={onNodeDoubleClicked}
                fitView
                fitViewOptions={fitViewOptions}
                defaultEdgeOptions={defaultEdgeOptions}
                zoomOnDoubleClick={false}
                onDoubleClick={onDoubleClick}
                >
            <Background color={lightTheme.primaryColor} variant={BackgroundVariant.Dots} />
            </ReactFlow>
            {position && <AddNodeMenu position={position} handleClose={handleClose}/>}
        </Editor>
    )
}

export default NodeEditor