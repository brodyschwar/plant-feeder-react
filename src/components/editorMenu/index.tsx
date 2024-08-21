import React from "react";
import styled from "@emotion/styled";
import { darkTheme } from "../../themes/themes";
import MenuButton from "./menuButton";

const Wrapper = styled.div`
    height: 2rem;
    width: 100%;
    padding: 0.2rem;
    background: ${ darkTheme.baseColor };
    display: flex;
`


const EditorMenu = () => {
    return (
        <Wrapper>
            <MenuButton>Button</MenuButton>
        </Wrapper>
    );
};

export default EditorMenu