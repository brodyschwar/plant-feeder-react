import axios from "axios"
import React, { ReactNode, createContext, useState, useCallback, useContext } from "react"
import { buildFolderStructure } from "../../utils/fileOperations"
import { Toast, ToastContext } from "../Toast"
import { isNodeEditorFile, NodeEditorFile } from "../../data/templates"

interface FileManager {
    openFile: null | File,
    fileData: null | NodeEditorFile
    fileStructure: null | Folder
    connectToHost: (props: {hostname: string, port: string}) => void,
    deletePath: (item: File | Folder) => void,
    makeDir: (dirname: string) => void,
    makeFileFromTemplate: (filePath: string, template: object) => void,
    loadFile: (file: File) => void,
    save: (data: NodeEditorFile) => void
}

export interface File {
    name: string,
    fullName: string
}

export interface Folder {
    name: string,
    fullName: string,
    folders: Folder[]
    files: File[]
}

const initialFileManager: FileManager = {
    openFile: null,
    fileData: null,
    fileStructure: null,
    connectToHost: (props: {hostname: string, port: string}) => {},
    deletePath: (item: File | Folder) => {},
    makeDir: (dirname: string) => {},
    makeFileFromTemplate: (filePath: string, template: object) => {},
    loadFile: (file: File) => {},
    save: (data: NodeEditorFile) => {}
}

export const FileManagerContext = createContext<FileManager>(initialFileManager)

const FileMangerProvider = ({children}: {children: ReactNode}) => {
    const [openFile, setOpenFile] = useState<null | File>(null);
    const [fileData, setFileData] = useState<null | NodeEditorFile>(null)
    const { sendMessage } = useContext(ToastContext)
    const [fileStructure, setFileStructure] = useState<null | Folder>(null);
    const [hostname, setHostname] = useState<string>("");
    const [port, setPort] = useState<string>("");

    const loadFileStructure = useCallback(async (props: {hostname: string, port: string, successMessage?: Toast}) => 
    {
        await axios.get(`http://${props.hostname}:${props.port}/file-operations/files`)
        .then(reponse => {
            const build = buildFolderStructure(reponse.data.files);
            setFileStructure(build)
            if (props.successMessage !== undefined) sendMessage(props.successMessage)
        })
        .catch(error => {
            console.error("Error: ", error)
            sendMessage({
                severity: "error",
                message: `Could not connect to ${props.hostname}:${props.port}`,
                key: String(Date.now())
            })
        })
    }, [sendMessage])

    const connectToHost = useCallback((props: {hostname: string, port: string}) => 
    {
        setHostname(props.hostname);
        setPort(props.port)
        loadFileStructure({...props, successMessage: {
            severity: "success",
            key: String(Date.now()),
            message: `Connected to ${props.hostname}:${props.port}`
        }})
    }, [loadFileStructure])

    const deletePath = useCallback(async (item: File | Folder) => {
        await axios.post(`http://${hostname}:${port}/file-operations/delete`, { path: item.fullName })
        .then(response => {
            sendMessage({
                severity: "success",
                message: `Removed ${item.fullName}`,
                key: String(Date.now())
            })
            loadFileStructure({hostname: hostname, port: port});
        })
        .catch(error => {
            console.error("Error: ", error)
            sendMessage({
                severity: "error",
                message: `Could not delete ${item.fullName}`,
                key: String(Date.now())
            })
        })
    }, [sendMessage, hostname, port, loadFileStructure])

    const makeDir = useCallback(async (dirname: string) => {
        await axios.post(`http://${hostname}:${port}/file-operations/create-directory`, { dirname: dirname })
        .then(response => {
            sendMessage({
                severity: "success",
                message: `Created new folder ${dirname}`,
                key: String(Date.now())
            })
            loadFileStructure({hostname: hostname, port: port})
        })
        .catch(error => {
            console.error("Error: ", error)
            sendMessage({
                severity: "error",
                message: `Could not create folder ${dirname}`,
                key: String(Date.now())
            })
        })
    }, [hostname, port, sendMessage, loadFileStructure])

    const makeFileFromTemplate = useCallback(async (filePath: string, template: object) => {
        await axios.post(`http://${hostname}:${port}/file-operations/create-json-file`, { filename: filePath })
        .then(response => {
            return axios.post(`http://${hostname}:${port}/file-operations/save`, {filename: filePath, data: template})
        })
        .then(response => {
            loadFileStructure({hostname: hostname, port: port, successMessage: {
                severity: "success",
                message: `Created template at ${filePath}`,
                key: String(Date.now())
            }})
        })
        .catch(error => {
            console.error("Error: ", error)
            sendMessage({
                severity: "error",
                message: `Could not create File ${filePath}`,
                key: String(Date.now())
            })
        })
    }, [loadFileStructure, hostname, port, sendMessage])

    const loadFile = useCallback(async (file: File) => {
        if (file.fullName === openFile?.fullName) return;

        await axios.get(`http://${hostname}:${port}/file-operations/load/${file.fullName}`)
        .then(response => {
            if (isNodeEditorFile(response.data)) {
                setOpenFile(file)
                setFileData(response.data)
            }
        })
        .catch(error => {
            console.error("Error: ", error)
            sendMessage({
                severity: "error",
                message: `Could not create File ${file.fullName}`,
                key: String(Date.now())
            })
        })
    }, [openFile, sendMessage, hostname, port])

    const save = useCallback(async (data: NodeEditorFile) => {
        if (openFile === null) {
            sendMessage({
                severity: "error",
                message: `Cannot save since there is no open file`,
                key: String(Date.now())
            });
            return;
        }
        
        await axios.post(`http://${hostname}:${port}/file-operations/save`, { filename: openFile.fullName, data})
        .then(() =>
            sendMessage({
                severity: "success",
                message: "Successfully saved!",
                key: String(Date.now())
            })
        )
        .catch(error => {
            console.error("Error: ", error)
            sendMessage({
                severity: "error",
                message: `Could not create save`,
                key: String(Date.now())
            })
        })
    }, [sendMessage, hostname, port, openFile])
    
    return (
        <FileManagerContext.Provider value={{
            openFile,
            fileData,
            fileStructure,
            connectToHost,
            deletePath,
            makeDir,
            makeFileFromTemplate,
            loadFile,
            save
        }}>
            {children}
        </FileManagerContext.Provider>
    )
}

export default FileMangerProvider

