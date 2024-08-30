import React, { 
    useState, 
    useCallback,
    MouseEvent, 
    useRef,
    useContext,
    useEffect
} from 'react';
import styled from '@emotion/styled';
import { darkTheme } from '../../themes/themes';
import { 
    ReactFlow, 
    addEdge,
    type Node,
    type Edge,
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
} from './nodes';
import AddNodeMenu from './addNodeMenu';
import { EditorManagerContext } from '../../contexts/nodeEditorContext';
import { FileManagerContext } from '../../contexts/fileManager';
import { NODE_LIST } from '../../data/generatedNodes';
import { GenerateMenuMap } from '../../utils/nodeMenuSetup';
import { useAddNodeFromMenu } from '../../hooks/nodeHooks';

const Editor = styled.div`
    background: ${ darkTheme.degreeTwo };
    flex: auto;
    width: 100%;
`

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


const BASE_MENU = GenerateMenuMap(NODE_LIST)

const NodeEditor = () => {
    const connectingNodeId = useRef<string | null>(null);
    const [position, setPosition] = useState<XYPosition | null>(null);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const { setInspectedNode } = useContext(EditorManagerContext);
    const { openFile, fileData } = useContext(FileManagerContext);
    const handleClose = () => {
        setPosition(null);
    }
    const addNodeFromMenu = useAddNodeFromMenu(handleClose)

    useEffect(() => {
        if (fileData) {
            setEdges(fileData.edges);
            setNodes(fileData.nodes);
        }
    }, [openFile, fileData, setNodes, setEdges]);

    const onConnect: OnConnect = useCallback(
        (params) => {
            connectingNodeId.current = null
            setEdges((els) => addEdge(params, els))
        },
        [setEdges],
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

    const onNodeDoubleClicked: NodeMouseHandler<Node> = (event: React.MouseEvent, node: Node) => {
        event.stopPropagation()
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
            <Background color={darkTheme.primaryColor} variant={BackgroundVariant.Dots} />
            </ReactFlow>
            {
                position && 
                <AddNodeMenu 
                    position={position} 
                    addNodeFromMenu={addNodeFromMenu(position, connectingNodeId.current)}
                    handleClose={handleClose}
                    menuItems={[]}
                    subMenus={BASE_MENU}
                    />
            }
        </Editor>
    )
}

export default NodeEditor