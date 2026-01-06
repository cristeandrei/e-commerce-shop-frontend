import type { DOMAttributes, ReactNode } from "react";

interface FormProps extends DOMAttributes<HTMLFormElement> {
    children: ReactNode;
}

export function Form(formProps: FormProps) {

    return <form {...formProps}>
        {formProps.children}
    </form>;
}