import type { InputHTMLAttributes } from "react";
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    lable: string,
}

export function Input({ lable, ...inputHTMLAttributes }: InputProps){
    return <div className={styles.formGroup}>
        <label htmlFor={inputHTMLAttributes.id}>{lable}</label>
        <input
            {...inputHTMLAttributes}
        />
    </div>;
}