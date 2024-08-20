import React from "react";
import styled from "@emotion/styled";
import { Handle, Position } from "@xyflow/react";
import { lightTheme, nodeColors } from "../../themes/themes";

const NodeBox = styled.div<{ color: string }>`
    width: 5rem;
    border: 1px solid ${ props => props.color };
    padding: 5px;
    border-radius: 5px;
    background: ${ lightTheme.backgroundColor };
`

const HandleIcon = styled(Handle)`
    border: 0.1rem solid #000; /* Adjust the color as needed */
    border-radius: 50%;
    width: 0.5rem; /* Set a width for the circle */
    height: 0.5rem; /* Set a height for the circle */
`;

const RootNode = () => {
    return (
        <NodeBox color={ nodeColors.red }>
            <HandleIcon type="source"
                position={Position.Bottom}
                id={"root"}/>
        </NodeBox>
    );
}

const CompositeNode = () => {
    return (
        <NodeBox color={nodeColors.yellow}>
            <HandleIcon type="target"
                position={Position.Top}
                id={"entry"}/>
            <HandleIcon type="source"
                position={Position.Bottom}
                id={"exit"}/>
        </NodeBox>
    )
}

const BehaviorNode = () => {
    return (
        <NodeBox color={nodeColors.green}>
            <HandleIcon type="target"
                position={Position.Top}
                id={"entry"}/>
        </NodeBox>
    );
}

const DecoratorNode = () => {
    return (
        <NodeBox color={nodeColors.puple}>
            <HandleIcon type="target"
                position={Position.Top}
                id={"entry"}/>
            <HandleIcon type="source"
                position={Position.Bottom}
                id={"exit"}/>
        </NodeBox>
    )
}

export { RootNode, CompositeNode, BehaviorNode, DecoratorNode }