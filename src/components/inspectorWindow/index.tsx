import styled from "@emotion/styled";
import React from "react";
import { darkTheme } from "../../themes/themes";
import NodeInspector from "./nodeInspector.tsx";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: ${ darkTheme.degreeFour };
`

const Header = styled.div`
    width: 100%;
    height: 2.5rem;
    background: ${ darkTheme.degreeTwo };

`
const Title = styled.h2`
    padding: 0;
    margin: 0;
    font-weight: bold;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    align-items: center;
    color: ${ darkTheme.primaryColor }
`

const InspectorWindow = () => {
    return (
        <Container>
            <Header>
                <Title>
                    Inspector
                </Title>
            </Header>
            <NodeInspector/>
        </Container>
    )
}

export default InspectorWindow