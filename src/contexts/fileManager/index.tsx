import axios from "axios"
import React, { ReactNode, createContext, useState, useCallback, useContext } from "react"
import { buildFolderStructure } from "../../utils/fileOperations"
import { Toast, ToastContext } from "../Toast"
import { BEHAVIOR_TREE_TEMPLATE } from "../../data/templates"

interface FileManager {
    fileStructure: null | Folder
    connectToHost: (props: {hostname: string, port: string}) => void,
    deletePath: (item: File | Folder) => void,
    makeDir: (dirname: string) => void,
    makeFileFromTemplate: (filePath: string, template: object) => void
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
    fileStructure: null,
    connectToHost: (props: {hostname: string, port: string}) => {},
    deletePath: (item: File | Folder) => {},
    makeDir: (dirname: string) => {},
    makeFileFromTemplate: (filePath: string, template: object) => {}
}

export const FileManagerContext = createContext<FileManager>(initialFileManager)

export const useBehaviorTreeTemplate = () => {
    const { makeFileFromTemplate } = useContext(FileManagerContext);

    const makeFile = useCallback((filePath: string) => {
        makeFileFromTemplate(filePath, BEHAVIOR_TREE_TEMPLATE)
    }, [makeFileFromTemplate])

    return makeFile
}

const FileMangerProvider = ({children}: {children: ReactNode}) => {
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

    return (
        <FileManagerContext.Provider value={{
            fileStructure: fileStructure,
            connectToHost: connectToHost,
            deletePath: deletePath,
            makeDir: makeDir,
            makeFileFromTemplate: makeFileFromTemplate
        }}>
            {children}
        </FileManagerContext.Provider>
    )
}

export default FileMangerProvider

