import React from 'react';
import styled from '@emotion/styled';
import { Panel, PanelGroup } from 'react-resizable-panels';
import EditorMenu from '../editorMenu'
import ResizeHandle from '../ResizeHandle';
import NodeEditor from '../nodeEditor';
import '@xyflow/react/dist/style.css'
import FileWindow from '../fileWindow';

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
                    <NodeEditor></NodeEditor>
                </MenuEditorWrapper>
            </Panel>
            <ResizeHandle/>
            <Panel defaultSize={30} minSize={30}>
                <FileWindow/>
            </Panel>
        </PanelGroup>
    )
}

export default EditorWindow