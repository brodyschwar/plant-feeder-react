import React from 'react';
import { styled } from 'styled-components';
import { Panel, PanelGroup } from 'react-resizable-panels';
import EditorMenu from '../editorMenu'
import ResizeHandle from '../ResizeHandle';
import NodeEditor from '../nodeEditor';
import '@xyflow/react/dist/style.css'

const Inspector = styled.div`
    background: #DECABA;
    height: 100%;
`

const MenuEditorWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`



const EditorWindow = () => {
    return (
        <PanelGroup direction="vertical">
            <Panel defaultSize={80} minSize={20}>
                <MenuEditorWrapper>
                    <EditorMenu/>
                    <NodeEditor></NodeEditor>
                </MenuEditorWrapper>
            </Panel>
            <ResizeHandle/>
            <Panel defaultSize={20} minSize={10}>
                <Inspector>Inspector</Inspector>
            </Panel>
        </PanelGroup>
    )
}

export default EditorWindow