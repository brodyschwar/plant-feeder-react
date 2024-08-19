import React from "react"
import styled from "styled-components"
import { lightTheme } from "../../themes/themes"
import { PanelResizeHandle } from "react-resizable-panels"

const Outer = styled(PanelResizeHandle)`
    flex: 0 0 0.2rem;
    position: relative;
    outline: none;
    background: ${ lightTheme.textColor };
`

export default function ResizeHandle() {
    return (
        <Outer>
        </Outer>
    );
}