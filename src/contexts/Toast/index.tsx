import React, { createContext, ReactNode, useState, useEffect } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

export interface Toast {
    severity: AlertColor,
    message: string,
    key: string
}

interface ToastManager {
    sendMessage: (toast: Toast) => void
}

const initialToastManager: ToastManager = { sendMessage: () => {} };

export const ToastContext = createContext(initialToastManager);

const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<Toast | null>(null);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleClose = () => {
        setToast(null);
    };

    return (
        <ToastContext.Provider value={{ sendMessage: (toast: Toast) => setToast(toast) }}>
            {children}
            {toast && (
                <Snackbar
                    open={!!toast}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    key={toast.key}
                >
                    <Alert onClose={handleClose} severity={toast.severity}>
                        {toast.message}
                    </Alert>
                </Snackbar>
            )}
        </ToastContext.Provider>
    );
};

export default ToastProvider;
