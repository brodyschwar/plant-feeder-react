import React from 'react';
import { styled } from 'styled-components';
import { Panel, PanelGroup } from 'react-resizable-panels';
import EditorMenu from '../editorMenu'
import ResizeHandle from '../ResizeHandle';

const Editor = styled.div`
    background: #ABC4B4
    height: 100%;
`

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
            <Panel defaultSize={70} minSize={20}>
                <MenuEditorWrapper>
                    <EditorMenu/>
                    <Editor>Editor</Editor>
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