import { Server, Response } from 'miragejs'
import uniqueId from 'lodash/uniqueId'
import isEmpty from 'lodash/isEmpty'

export default function authFakeApi(server: Server, apiPrefix: string) {
    server.post(`${apiPrefix}/auth/login`, (schema, { requestBody }) => {
        const { mobile, password } = JSON.parse(requestBody)
        const user = schema.db.signInUserData.findBy({
            mobile,
            password,
        })
        if (user) {
            return {
                user,
                token: 'wVYrxaeNa9OxdnULvde1Au5m5w63',
            }
        }
        return new Response(
            401,
            { message: 'نام کاربری یا رمز عبور اشتباه است!' }
        )
    })

    server.post(`${apiPrefix}/sign-out`, () => {
        return true
    })

    server.post(`${apiPrefix}/auth/signUp`, (schema, { requestBody }) => {
        const body = JSON.parse(requestBody)
        const userExist = schema.db.signInUserData.findBy({
            mobile:body.mobile
        })
        const newUser = {
            avatar: '/img/avatars/thumb-1.jpg',
            authority: ['admin', 'user'],
            ...body
        }
        if (!isEmpty(userExist)) {
            const errors = [
                { message: '', domain: 'global', reason: 'invalid' },
            ]
            return new Response(
                400,
                { some: 'header' },
                { errors, message: 'حساب کاربری با این مشخصات موجود است!' }
            )
        }

        schema.db.signInUserData.insert({
            ...newUser,
            id: uniqueId('user_') ,
        })
        return {
            user: newUser,
            token: 'wVYrxaeNa9OxdnULvde1Au5m5w63',
        }
    })

    server.post(`${apiPrefix}/forgot-password`, () => {
        return true
    })

    server.post(`${apiPrefix}/reset-password`, () => {
        return true
    })
}
