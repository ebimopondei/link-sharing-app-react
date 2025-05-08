export interface User {
    id?: string,
    username: string,
    email: string,
    phone?: string,
    password_hash?: string,
    avatar_url?: string,
    firstname: string,
    lastname: string,
    password?: string,
    address?: string,
    country?: string,
    dob?: string,
    vibe_score?: number,
    account_type?: string,
    is_verified?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface UserResonse{
    success: boolean,
    message: string,
    data: User | null
}