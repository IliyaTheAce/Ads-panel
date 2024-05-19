export type SignInCredential = {
    username: string
    password: string
}

export type SignInResponse = {
    data: {
        token: string
        username: string
        lastname: string
        firstname: string
        role: string
    }
}

export type SignUpResponse = {
    result: boolean
}

export type SignUpCredential = {
    firstname: string
    lastname: string
    mobile: string
    email: string
    password: string
    password_confirmation: string
    username: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
