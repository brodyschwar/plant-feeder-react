import React from "react";
import styled from "@emotion/styled";
import { lightTheme } from "../../themes/themes";
import MenuButton from "./menuButton";

const Wrapper = styled.div`
    height: 2rem;
    width: 100%;
    padding: 0.2rem;
    background: ${ lightTheme.textColor };
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