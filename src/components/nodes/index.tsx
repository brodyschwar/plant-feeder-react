import React from "react";
import styled from "@emotion/styled";
import { Handle, HandleProps, NodeProps, Position, useHandleConnections } from "@xyflow/react";
import { darkTheme, nodeColors } from "../../themes/themes";
import DynamicDisplay from "./dynamicDisplay.tsx";

const NodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 8rem;
    margin: 0;
`

const NodeTitle = styled.div<{ color: string, selected: boolean }>`
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  padding: 0.3rem;
  background-color: ${props => props.color};
  outline: ${ props => props.selected ? "0.3rem" : "0.1rem"} solid ${props => props.color};
`;

const NodeBody = styled.div<{ color: string, selected: boolean }>`
    outline: ${ props => props.selected ? "0.3rem" : "0.1rem"} solid ${ props => props.color };
    padding: 0.3rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background: ${ darkTheme.backgroundColor };
`

const CustomHandle = styled(Handle)`
    height: 0.5rem;
    width: 0.5rem;
    background: ${ darkTheme.baseColor };
`

interface LimitedConnectionHandleProps extends HandleProps {
    nodeid: string,
    maxconnection: number
}

const LimitedConnectionHandle = (props: LimitedConnectionHandleProps) => {
    const connections = useHandleConnections({
        type: props.type
      });
    return (
        <CustomHandle
            {...props}
            isConnectable={connections.length < props.maxconnection}/>
    )
}

const RootNode = (props: NodeProps) => {
    return (
        <NodeContainer>
            <NodeTitle selected={!!props.selected} color={ nodeColors.red }>
                {Boolean(props.data && props.data.label) ? String(props.data.label) : ""}
            </NodeTitle>
            <NodeBody selected={!!props.selected} color={ nodeColors.red }>
                { props.data && <DynamicDisplay data={props.data}/> }
            </NodeBody> 
            <LimitedConnectionHandle type="source"
                    position={Position.Bottom}
                    id={"root"}
                    nodeid={props.id}
                    maxconnection={1}/>
        </NodeContainer>
        
    );
}

const CompositeNode = (props: NodeProps) => {
    return (
        <NodeContainer>
            <CustomHandle type="target"
                    position={Position.Top}
                    id={"entry"}/>
            <NodeTitle selected={!!props.selected} color={nodeColors.puple}>
                {Boolean(props.data && props.data.label) ? String(props.data.label) : ""}
            </NodeTitle>
            <NodeBody selected={!!props.selected} color={nodeColors.yellow}>
                { props.data && <DynamicDisplay data={props.data}/> }
            </NodeBody>
            <CustomHandle type="source"
                    position={Position.Bottom}
                    id={"exit"}/>
        </NodeContainer>
    )
}

const BehaviorNode = (props: NodeProps) => {
    return (
        <NodeContainer>
            <CustomHandle type="target"
                    position={Position.Top}
                    id={"entry"}/>
            <NodeTitle selected={!!props.selected} color={nodeColors.green}>
                {Boolean(props.data && props.data.label) ? String(props.data.label) : ""}
            </NodeTitle>
            <NodeBody selected={!!props.selected} color={nodeColors.green}>
                { props.data && <DynamicDisplay data={props.data}/> }
            </NodeBody>
        </NodeContainer>
    );
}

const DecoratorNode = (props: NodeProps) => {
    return (
        <NodeContainer>
            <CustomHandle type="target"
                    position={Position.Top}
                    id={"entry"}/>
            <NodeTitle selected={!!props.selected} color={nodeColors.yellow}>
                {Boolean(props.data && props.data.label) ? String(props.data.label) : ""}
            </NodeTitle>
            <NodeBody selected={!!props.selected} color={nodeColors.green}>
                { props.data && <DynamicDisplay data={props.data}/> }
            </NodeBody>
            <CustomHandle type="source"
                    position={Position.Top}
                    id={"exit"}/>
        </NodeContainer>
    )
}

export { RootNode, CompositeNode, BehaviorNode, DecoratorNode }