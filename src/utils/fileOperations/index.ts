import { File, Folder } from '../../contexts/fileManager/index'

export const buildFolderStructure = (items: { type: string, name: string, path: string }[]): Folder => {
    // Helper function to create a Folder or File
    const createItem = (type: string, name: string, path: string): Folder | File => {
        const fullName = path;
        if (type === 'file') {
            return { name, fullName } as File;
        } else if (type === 'directory') {
            return { name, fullName, folders: [], files: [] } as Folder;
        }
        throw new Error('Unknown type');
    };

    const root: Folder = { name: "root", fullName: "", folders: [], files: [] };
    const folderMap: { [path: string]: Folder } = { "" : root};

    // Initialize folders
    items.filter(item => item.type === 'directory').forEach(item => {
        folderMap[item.path] = createItem(item.type, item.name, item.path) as Folder;
    });

    // Initialize files and assign them to folders
    items.filter(item => item.type === 'file')
    .forEach(item => {
        const parentPath = item.path.substring(0, item.path.lastIndexOf('/'));
        if (folderMap[parentPath]) {
            folderMap[parentPath].files.push(createItem(item.type, item.name, item.path) as File);
        } else {
            // Handle case where file is in a root-level directory or unexpected case
            throw new Error(`Parent folder for file ${item.path} not found`);
        }
    })

    // Assign subfolders to their parent folders
    Object.keys(folderMap).forEach(path => {
        const folder = folderMap[path];
        const parentPath = path.substring(0, path.lastIndexOf('/'));
        if (path !== "") folderMap[parentPath].folders.push(folder);
    });

    return root
};
