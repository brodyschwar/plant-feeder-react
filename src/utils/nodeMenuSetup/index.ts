export interface BehaviorTreeNodeMenuLayout {
    name: string,
    nodes: { data: any, type: string }[],
    nodeFiles: BehaviorTreeNodeMenuLayout[]
}

export function GenerateMenuMap(nodeList: { data: any, type: string, folder: string }[]): BehaviorTreeNodeMenuLayout[] {
    const folders: { [key: string]: BehaviorTreeNodeMenuLayout } = {};

    const getOrCreateFolder = (path: string): BehaviorTreeNodeMenuLayout => {
        if (!folders[path]) {
            const parts = path.split('/').filter(Boolean);
            let currentPath = '';
            let parentFolder = null;

            for (const part of parts) {
                currentPath = currentPath ? `${currentPath}/${part}` : part;

                if (!folders[currentPath]) {
                    console.log("creating folder with path " + currentPath)
                    folders[currentPath] = {
                        name: part,
                        nodes: [],
                        nodeFiles: []
                    };
                }

                if (parentFolder) {
                    parentFolder.nodeFiles.push(folders[currentPath]);
                }

                parentFolder = folders[currentPath];
            }
        }
        return folders[path];
    };

    nodeList.forEach((node) => {
        const { folder, data, type } = node;
        const folderPath = folder.trim(); // Make sure to trim spaces

        // Get or create the folder where the node belongs
        console.log("Trying to get folder " + folderPath)
        const currentFolder = getOrCreateFolder(folderPath);
        
        // Add the node to the current folder's nodes list
        currentFolder.nodes.push({ data, type });
    });

    // Collect top-level folders (those without a parent)
    const topLevelFolders: BehaviorTreeNodeMenuLayout[] = [];
    for (const key in folders) {
        if (key.indexOf('/') === -1) { // No '/' means it's a top-level folder
            topLevelFolders.push(folders[key]);
        }
    }

    return topLevelFolders;
}
