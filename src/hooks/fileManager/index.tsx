import { useContext, useCallback } from "react";
import { FileManagerContext } from "../../contexts/fileManager";
import { BEHAVIOR_TREE_TEMPLATE } from "../../data/templates";

export const useBehaviorTreeTemplate = () => {
    const { makeFileFromTemplate } = useContext(FileManagerContext);

    const makeFile = useCallback((filePath: string) => {
        makeFileFromTemplate(filePath, BEHAVIOR_TREE_TEMPLATE)
    }, [makeFileFromTemplate])

    return makeFile
}