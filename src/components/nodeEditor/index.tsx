import React, { useState, useCallback } from 'react';
import { styled } from 'styled-components';
import { lightTheme } from '../../themes/themes';
import { 
    ReactFlow, 
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    type Node,
    type Edge,
    type FitViewOptions,
    type OnConnect,
    type OnNodesChange,
    type OnEdgesChange,
    type DefaultEdgeOptions,
    type NodeTypes,
} from '@xyflow/react';
import { 
    RootNode, 
    CompositeNode, 
    BehaviorNode,
    DecoratorNode
} from '../nodes';

const Editor = styled.div`
    background: ${ lightTheme.backgroundColor };
    flex: auto;
    width: 100%;
`
const initialNodes: Node[] = [
{ id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 }, type: "rootNode" },
{ id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 }, type: "compositeNode" },
{ id: '3', data: { label: 'Node 3' }, position: { x: 100, y: 100 }, type: "behaviorNode" },
{ id: '4', data: { label: 'Node 4' }, position: { x: 100, y: 200 }, type: "decoratorNode" }
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

const fitViewOptions: FitViewOptions = {
padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
animated: true,
};

const nodeTypes: NodeTypes = { 
    rootNode: RootNode, 
    compositeNode: CompositeNode,
    behaviorNode: BehaviorNode,
    decoratorNode: DecoratorNode
}
   

const NodeEditor = () => {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
   
    const onNodesChange: OnNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      [setNodes],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      [setEdges],
    );
    const onConnect: OnConnect = useCallback(
      (connection) => {
        setEdges((eds) => addEdge(connection, eds))
      },
      [setEdges],
    );

    return (
        <Editor>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                fitViewOptions={fitViewOptions}
                defaultEdgeOptions={defaultEdgeOptions}
                />
        </Editor>
    )
}

export default NodeEditor