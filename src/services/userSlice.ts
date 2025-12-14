import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from "../store.ts";
import type {UserDetails, UserDetailsResponse} from "../types/userDetailsResponse.ts";

const initialState: UserDetails = {
    username: null,
    csrfToken: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<UserDetailsResponse>) => {
            state.username = action.payload.username;
        },
        setCsrfToken: (state, action: PayloadAction<string | null>) => {
            state.csrfToken = action.payload;
        },
        clearUserDetails: (state) => {
            state.username = null;
        }
    },
});

export const {setUserDetails, clearUserDetails, setCsrfToken} = userSlice.actions;
export default userSlice.reducer;
// Selector to easily access the data
export const selectUserDetails = (state: RootState) => state.user;
