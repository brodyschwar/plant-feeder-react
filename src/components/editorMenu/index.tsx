import React from "react";
import styled from "styled-components";
import { lightTheme } from "../../themes/themes";

const Wrapper = styled.div`
    height: 2rem;
    width: 100%;
    background: ${ lightTheme.primaryColor }
`


const EditorMenu = () => {
    return (
        <Wrapper>
            Menu
        </Wrapper>
    );
};

export default EditorMenu