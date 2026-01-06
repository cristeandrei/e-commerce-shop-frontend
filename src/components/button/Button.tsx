import type { ButtonHTMLAttributes } from "react";
import sytles from './Button.module.css'

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string,
}

export function Button({ children, ...buttonHTMLAttributes }: SubmitButtonProps) {
    return <button className={sytles.button} {...buttonHTMLAttributes}>{children}</button>;
}