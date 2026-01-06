import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { SerializedError } from "@reduxjs/toolkit/react";

export type NetworkError = FetchBaseQueryError | {
    status: string;
    error: string;
} | SerializedError | undefined;