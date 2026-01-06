import type { NetworkError } from "../../types/networkError";

export interface SubmitErrorProsp{
    error: NetworkError
}

export default function SubmitError(props: SubmitErrorProsp ){
    return <>{props.error && <p style={{ color: 'red' }}>{JSON.stringify(props.error)}</p>}</>;
}