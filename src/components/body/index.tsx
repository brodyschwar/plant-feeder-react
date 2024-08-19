import React from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import EditorWindow from "../editorWindow";
import FileWindow from "../fileWindow";
import ResizeHandle from "../ResizeHandle";

const Body = () => {
    return (
        <PanelGroup direction="horizontal">
            <Panel defaultSize={20} minSize={10}>
                <FileWindow/>
            </Panel>
            <ResizeHandle/>
            <Panel defaultSize={70} minSize={20}>
                <EditorWindow/>
            </Panel>
        </PanelGroup>
    );
};

export default Body