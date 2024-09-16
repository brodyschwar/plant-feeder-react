import { useContext, useCallback, useState, useEffect } from "react";
import { FileManagerContext, Folder } from "../../contexts/fileManager";
import { BEHAVIOR_TREE_TEMPLATE } from "../../data/templates";
import { BehaviorTreeNodeMenuLayout } from "../../utils/nodeMenuSetup";

export const useBehaviorTreeTemplate = () => {
    const { makeFileFromTemplate } = useContext(FileManagerContext);

    const makeFile = useCallback((filePath: string) => {
        makeFileFromTemplate(filePath, BEHAVIOR_TREE_TEMPLATE)
    }, [makeFileFromTemplate])

    return makeFile
}

export const useTreeNodes = () => {
    const [nodes, setNodes] = useState<BehaviorTreeNodeMenuLayout | null>(null)
    const { fileStructure, openFile } = useContext(FileManagerContext)

    useEffect(() => {
        if (fileStructure === null) {
            setNodes(null)
            return
        }

        function convertFolderToMenuLayout(folder: Folder): BehaviorTreeNodeMenuLayout {
            return {
                name: folder.name,
                nodes: folder.files.filter(file => file.fullName !== openFile?.fullName).map((file) => ({
                    data: { label: file.name, file: file.fullName },
                    type: "treeNode"
                })),
                nodeFiles: folder.folders.map(subFolder => convertFolderToMenuLayout(subFolder))
            }
        }

        const menuLayout: BehaviorTreeNodeMenuLayout = {
            ...convertFolderToMenuLayout(fileStructure),
            name: "From File"
        }

        setNodes(menuLayout)
    }, [fileStructure, openFile])

    return nodes
}