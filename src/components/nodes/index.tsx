import React from "react";
import styled from "@emotion/styled";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { lightTheme, nodeColors } from "../../themes/themes";
import DynamicDisplay from "./dynamicDisplay.tsx";

const NodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 8rem;
`

const NodeTitle = styled.div<{ color: string}>`
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  align-items: center;
  font-weight: bold;
  padding: 1rem;
  width: 100%;
  background-color: ${props => props.color};
  border: 0.1rem solid ${props => props.color};
`;

const NodeBody = styled.div<{ color: string }>`
    border: 0.1rem solid ${ props => props.color };
    padding: 1rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    width: 100%;
    background: ${ lightTheme.backgroundColor };
`

const RootNode = (props: NodeProps) => {
    return (
        <NodeContainer>
            <NodeTitle color={ nodeColors.red }>
                {Boolean(props.data && props.data.label) ? String(props.data.label) : ""}
            </NodeTitle>
            <NodeBody color={ nodeColors.red }>
                { props.data && <DynamicDisplay data={props.data}/> }
            </NodeBody> 
            <Handle type="source"
                    position={Position.Bottom}
                    id={"root"}/>
        </NodeContainer>
        
    );
}

const CompositeNode = (props: NodeProps) => {
    return (
        <NodeContainer>
            <Handle type="target"
                    position={Position.Top}
                    id={"entry"}/>
            <NodeTitle color={nodeColors.yellow}>
                {Boolean(props.data && props.data.label) ? String(props.data.label) : ""}
            </NodeTitle>
            <NodeBody color={nodeColors.yellow}>
                { props.data && <DynamicDisplay data={props.data}/> }
            </NodeBody>
            <Handle type="source"
                    position={Position.Bottom}
                    id={"exit"}/>
        </NodeContainer>
    )
}

const BehaviorNode = (props: NodeProps) => {
    return (
        <NodeContainer>
            <Handle type="target"
                    position={Position.Top}
                    id={"entry"}/>
            <NodeTitle color={nodeColors.yellow}>
                {Boolean(props.data && props.data.label) ? String(props.data.label) : ""}
            </NodeTitle>
            <NodeBody color={nodeColors.green}>
                { props.data && <DynamicDisplay data={props.data}/> }
            </NodeBody>
        </NodeContainer>
    );
}

const DecoratorNode = (props: NodeProps) => {
    return (
        <NodeContainer>
            <Handle type="target"
                    position={Position.Top}
                    id={"entry"}/>
            <NodeTitle color={nodeColors.yellow}>
                {Boolean(props.data && props.data.label) ? String(props.data.label) : ""}
            </NodeTitle>
            <NodeBody color={nodeColors.green}>
                { props.data && <DynamicDisplay data={props.data}/> }
            </NodeBody>
            <Handle type="source"
                    position={Position.Top}
                    id={"exit"}/>
        </NodeContainer>
    )
}

export { RootNode, CompositeNode, BehaviorNode, DecoratorNode }