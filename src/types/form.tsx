import { ReactNode } from "react";

export interface InputFieldType {
    type: React.HTMLInputTypeAttribute,
    className?: string,
    placeholder?: string,
    Icon?: ReactNode,
    success?: boolean,
    error?: boolean,
    message?: string,
}

export interface ButtonType {
    name: string,
    className?: string,
    Icon?: ReactNode,
    success?: boolean,
    error?: boolean,
}