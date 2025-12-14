import {type BaseQueryApi, createApi, type FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {UserLoginDetails} from "../types/userLoginDetails.ts";
import * as Cookies from "js-cookie";
import type {UserDetailsResponse} from "../types/userDetailsResponse.ts";
import { setCsrfToken } from './userSlice.ts';

const getCsrfTokenFromCookie = () => Cookies.default.get('XSRF-TOKEN');

const shopBaseUrl = "http://localhost:8080";

const baseQuery = fetchBaseQuery({
    baseUrl: shopBaseUrl,
    credentials: 'include',
    prepareHeaders(headers, api) {
        let csrfToken = api.getState().user.csrfToken;

        if(csrfToken == null){
            throw new Error("csrf token is not set")
        }

        headers.set("X-XSRF-TOKEN", csrfToken)
    },
});

const customFetchWithToken = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {

    let methodType = typeof (args) == 'string' ? args : args.method;

    const isMutation = methodType && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(methodType.toUpperCase());

    if (!isMutation) {
        return baseQuery(args, api, extraOptions);
    }

    let csrfToken = api.getState().user.csrfToken;

    let csrfCookie = getCsrfTokenFromCookie();

    if(csrfCookie == undefined && csrfToken != null){
        api.dispatch(setCsrfToken(null))
    }

    if (csrfCookie && csrfToken) {
        return baseQuery(args, api, extraOptions);
    }

    console.debug("Token missing. Fetching a new token first...");

    const tokenResponse = await fetch(shopBaseUrl + '/auth/csrfToken', { credentials: "include"});

    if (!tokenResponse.ok) {
        console.error("Failed to acquire new token. Cannot proceed with mutation.");

        return {error: {status: "CUSTOM_ERROR", error: "Failed to get token"}}; // Stop the process with the error
    }

    let token = await tokenResponse.text();

    api.dispatch(setCsrfToken(token))

    return baseQuery(args, api, extraOptions);
};

export const shopApi = createApi({
    reducerPath: 'shop',
    baseQuery: customFetchWithToken,
    endpoints: (build) => ({
        login: build.mutation<UserDetailsResponse, UserLoginDetails>({
            query: (userLoginDetails: UserLoginDetails) => ({
                url: "/auth/login",
                method: "POST",
                headers: {
                    'Authorization': getAuthHeader(userLoginDetails)
                }
            }),
        }),
    }),
})

function getAuthHeader(userLoginDetails: UserLoginDetails) {
    const base64Credentials = btoa(`${userLoginDetails.username}:${userLoginDetails.password}`);

    return `Basic ${base64Credentials}`;
}

export const {useLoginMutation} = shopApi