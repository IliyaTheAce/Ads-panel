export type SignInCredential = {
    username: string
    password: string
}

export type SignInResponse = {
    data: {
        token: string
    }
    user: {
        firstName: string
        lastName: string
        mobile: string
        username: string
        authority: string[]
        avatar: string
        email: string
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    firstName: string
    lastName: string
    mobile: string
    password: string
    recommenderId: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
