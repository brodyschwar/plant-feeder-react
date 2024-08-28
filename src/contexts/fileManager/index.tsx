import axios from "axios"
import React, { ReactNode, createContext, useState, useCallback, useContext } from "react"
import { buildFolderStructure } from "../../utils/fileOperations"
import { ToastContext } from "../Toast"

interface FileManager {
    fileStructure: null | Folder
    connectToHost: (props: {hostname: string, port: string}) => void,
    delete: (item: File | Folder) => void
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
    delete: (item: File | Folder) => {}

}

export const FileManagerContext = createContext<FileManager>(initialFileManager)

const FileMangerProvider = ({children}: {children: ReactNode}) => {
    const { sendMessage } = useContext(ToastContext)
    const [fileStructure, setFileStructure] = useState<null | Folder>(null);
    const [hostname, setHostname] = useState<string>("");
    const [port, setPort] = useState<string>("");

    const connectToHost = useCallback(async (props: {hostname: string, port: string}) => 
    {
        setHostname(props.hostname);
        setPort(props.port)
        await axios.get(`http://${props.hostname}:${props.port}/file-operations/files`)
        .then(reponse => {
            const build = buildFolderStructure(reponse.data.files);
            setFileStructure(build)
            sendMessage({
                severity: "success",
                message: `Connect to ${props.hostname}:${props.port}`,
                key: String(Date.now())
            })
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

    const deleteItem = useCallback(async (item: File | Folder) => {
        await axios.post(`http://${hostname}:${port}/file-operations/delete-file`, { filename: item.fullName })
        .then(response => {
            sendMessage({
                severity: "success",
                message: `Removed ${item.fullName}`,
                key: String(Date.now())
            })
        })
        .catch(error => {
            console.error("Error: ", error)
            sendMessage({
                severity: "error",
                message: `Could not delete ${item.fullName}`,
                key: String(Date.now())
            })
        })
    }, [sendMessage, hostname, port])

    return (
        <FileManagerContext.Provider value={{
            fileStructure: fileStructure,
            connectToHost: connectToHost,
            delete: deleteItem
        }}>
            {children}
        </FileManagerContext.Provider>
    )
}

export default FileMangerProvider

