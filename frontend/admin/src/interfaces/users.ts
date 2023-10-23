export interface IUser {
    id: number
	   username: string
	   email: string
}

export interface UserResponse {
    user: IUser
    tokens: {
        accessToken: string
        refreshToken: string
    }
}
