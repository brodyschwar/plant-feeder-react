import React from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import EditorWindow from "../editorWindow";
import ResizeHandle from "../ResizeHandle";
import InspectorWindow from "../inspectorWindow";

const Body = () => {
    return (
        <PanelGroup direction="horizontal">
            <Panel defaultSize={20} minSize={10}>
                <InspectorWindow/>
            </Panel>
            <ResizeHandle/>
            <Panel defaultSize={80} minSize={20}>
                <EditorWindow/>
            </Panel>
        </PanelGroup>
    );
};

export default Body