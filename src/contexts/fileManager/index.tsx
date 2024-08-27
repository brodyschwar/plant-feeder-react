import axios from "axios"
import React, { ReactNode, createContext, useState, useCallback } from "react"
import { buildFolderStructure } from "../../utils/fileOperations"

interface FileManager {
    openFilename: string
    fileStructure: null | Folder
    connectToHost: (props: {hostname: string, port: string}) => void
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
    openFilename: "",
    fileStructure: null,
    connectToHost: (props: {hostname: string, port: string}) => {}
}

export const FileManagerContext = createContext<FileManager>(initialFileManager)

const FileMangerProvider = ({children}: {children: ReactNode}) => {
    const [openFilename, setOpenFilename] = useState("");
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
        })
        .catch(error => console.error("Error: ", error))
    }, [])

    return (
        <FileManagerContext.Provider value={{
            openFilename: openFilename,
            fileStructure: fileStructure,
            connectToHost: connectToHost
        }}>
            {children}
        </FileManagerContext.Provider>
    )
}

export default FileMangerProvider

