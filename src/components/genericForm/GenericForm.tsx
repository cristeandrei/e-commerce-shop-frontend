import InputError from "../inputError/InputError";
import SubmitError from "../submitError/SubmitError";
import { Form } from "../form/Form";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import type { NetworkError } from "../../types/networkError";
import type { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface GenericFormProps<TFieldValues extends FieldValues> {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    register: UseFormRegister<TFieldValues>
    buttonActionText : string,
    buttonLoadingActionText : string,
    isLoading: boolean,
    submitError: NetworkError,
    inputs: GenericFromInput<TFieldValues>[]
}

export interface GenericFromInput<TFieldValues> {
    lable: string,
    specifier: Path<TFieldValues>,
    required: boolean,
    id: string,
    type: HTMLInputTypeAttribute,
    autoComplete?: HTMLInputAutoCompleteAttribute,
    error? : string
}

export default function GenericfForm<TFieldValues extends FieldValues>(props: GenericFormProps<TFieldValues>) {
    const inputs = props
        .inputs
        .map(e => <>
            <Input
                lable={e.lable}
                {...props.register(e.specifier, { required: e.required })}
                type={e.type}
                id={e.id}
                autoComplete={e.autoComplete} />
            <InputError error={e.error} /></>);

    return <>
        <Form onSubmit={props.onSubmit}>

            {...inputs}

            <SubmitError error={props.submitError} />
            <Button type="submit" disabled={props.isLoading}>
                {props.isLoading ? props.buttonLoadingActionText : props.buttonActionText}
            </Button>
        </Form>
    </>
}