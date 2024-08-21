import React from "react"
import styled from "@emotion/styled"
import { darkTheme } from "../../themes/themes"
import { PanelResizeHandle } from "react-resizable-panels"

const Outer = styled(PanelResizeHandle)`
    flex: 0 0 0.2rem;
    position: relative;
    outline: none;
    background: ${ darkTheme.baseColor };
`

export default function ResizeHandle() {
    return (
        <Outer>
        </Outer>
    );
}