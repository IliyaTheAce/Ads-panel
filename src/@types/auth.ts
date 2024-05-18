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
