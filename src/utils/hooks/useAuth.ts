import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppDispatch,
    useAppSelector,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'

type Status = 'success' | 'failed'

function useAuth() {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useAppSelector((state) => state.auth.session)

    const signIn = async (
        values: SignInCredential
    ): Promise<
        | {
              status: Status
              message: string
          }
        | undefined
    > => {
        try {
            const resp = await apiSignIn(values)
            if (resp.data) {
                const { token } = resp.data.data
                dispatch(signInSuccess(token))
                if (resp.data.data) {
                    const user = {
                        userName: `${resp.data.data.firstname} ${resp.data.data.lastname}`,
                        email: resp.data.data.username,
                        authority: [resp.data.data.role],
                    }
                    dispatch(setUser(user))
                } else
                    dispatch(
                        setUser({
                            avatar: '',
                            userName: 'Anonymous',
                            authority: ['USER'],
                            email: '',
                        })
                    )
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values: SignUpCredential) => {
        try {
            const resp = await apiSignUp(values)
            return resp.data
            //
            // if (resp.data) {
            //     const { token } = resp.data
            //     dispatch(signInSuccess(token))
            //     if (resp.data.user) {
            //         const user = {
            //             ...resp.data.user,
            //             userName: `${resp.data.user.firstName} ${resp.data.user.lastName}`,
            //             email: resp.data.user.mobile,
            //         }
            //         dispatch(setUser(user))
            //     } else
            //         dispatch(
            //             setUser({
            //                 avatar: '',
            //                 userName: 'Anonymous',
            //                 authority: ['USER'],
            //                 email: '',
            //             })
            //         )
            //
            //     const redirectUrl = query.get(REDIRECT_URL_KEY)
            //     navigate(
            //         redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
            //     )
            //     return {
            //         status: 'success',
            //         message: '',
            //     }
            // }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                result: false,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(
            setUser({
                avatar: '',
                userName: '',
                email: '',
                authority: [],
            })
        )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
