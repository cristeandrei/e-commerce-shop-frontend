export interface UserDetailsResponse {
    username: string,
}

export interface UserDetails {
    username: string | null,
    csrfToken: string | null,
}