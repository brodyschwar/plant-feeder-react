import React from "react";
import styled from "@emotion/styled";
import { lightTheme } from "../../../themes/themes";

const MenuButton = styled.button`
    height: 100%;
    background: ${ lightTheme.textColor };
    border-radius: 0.2rem;
    border: none;
    color: ${ lightTheme.primaryColor };
    flex-align: right;
    &:hover {
        background: ${ lightTheme.secondaryColor };
    }
`

export default MenuButton