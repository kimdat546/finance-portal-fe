import { Toast, ToastClose, ToastDescription, ToastProvider as ToastProviderComponent, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { ToasterToast, useToast } from '@/hooks/use-toast';
import React, { createContext, ReactNode, useContext } from 'react';

interface ToastContextType {
    toast: ({ ...props }: ToasterToast) => { id: string; dismiss: () => void; update: (props: ToasterToast) => void; };
    dismiss: (toastId?: string) => void;
    toasts: ToasterToast[];
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const toastState = useToast();

    return (
        <ToastContext.Provider value={toastState}>
            <ToastProviderComponent>
                {children}
                <ToastViewport />
                {toastState.toasts.map((toast: ToasterToast) => (
                    <Toast key={toast.id} variant="default">
                        <ToastTitle>{toast.title}</ToastTitle>
                        <ToastDescription>{toast.description}</ToastDescription>
                        <ToastClose />
                    </Toast>
                ))}</ToastProviderComponent>
        </ToastContext.Provider>
    );
};

export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }
    return context;
};
