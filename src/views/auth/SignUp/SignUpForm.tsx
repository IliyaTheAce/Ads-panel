import { FormContainer, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'
import { useNavigate } from 'react-router-dom'
import { AUTH_PREFIX_PATH } from '@/constants/route.constant'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type SignUpFormSchema = {
    firstname: string
    lastname: string
    mobile: string
    email: string
    password: string
    password_confirmation: string
    username: string
}
const phoneRegex =
    /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/gi
const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('لطفا نام خود را وارد کنید.'),
    lastname: Yup.string().required('لطفا نام خانوادگی خود را وارد کنید.'),
    email: Yup.string()
        .required('لطفا ایمیل خود را وارد کنید.')
        .email('ایمیل را بدرستی وارد کنید'),
    mobile: Yup.string()
        .matches(phoneRegex, 'شماره تلفن نادرست است!')
        .required('لطفا شماره تلفن خود را وارد کنید.'),
    password: Yup.string().required('لطفا رمز عبور مورد نظر را وارد کنید.'),
    password_confirmation: Yup.string().oneOf(
        [Yup.ref('password')],
        'رمز های عبور وارد شده یکسان نیستند!'
    ),
    username: Yup.string().required('لطفا نام کاربری را وارد کنید.'),
})

const initialValues: SignUpFormSchema = {
    firstname: '',
    lastname: '',
    password_confirmation: '',
    password: '',
    email: '',
    username: '',
    mobile: '',
}
const SignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props
    const nav = useNavigate()
    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const onSignUp = async (
        values: SignUpFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        // const { user, password, email } = values
        setSubmitting(true)
        const result = await signUp(values)

        if (result?.result) {
            nav(`${AUTH_PREFIX_PATH}/sign-in`)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form className={'pb-10'}>
                        <FormContainer>
                            <FormItem
                                label="نام"
                                invalid={errors.firstname && touched.firstname}
                                errorMessage={errors.firstname}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="firstname"
                                    placeholder="نام"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="نام خانوادگی"
                                invalid={errors.lastname && touched.lastname}
                                errorMessage={errors.lastname}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="lastname"
                                    placeholder="نام خانوادگی"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="نام کاربری"
                                invalid={errors.username && touched.username}
                                errorMessage={errors.username}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="username"
                                    placeholder="نام کاربری"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="ایمیل"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="ایمیل"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="شماره تلفن"
                                invalid={errors.mobile && touched.mobile}
                                errorMessage={errors.mobile}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="mobile"
                                    placeholder="شماره تلفن"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="رمز عبور"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="رمز عبور"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <FormItem
                                label="تایید رمز عبور"
                                invalid={
                                    errors.password_confirmation &&
                                    touched.password_confirmation
                                }
                                errorMessage={errors.password_confirmation}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password_confirmation"
                                    placeholder="تایید رمز عبور"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'در حال ساخت حساب ...'
                                    : 'ثبت نام'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>حساب کاربری دارید؟ </span>
                                <ActionLink to={signInUrl}>
                                    ورود به سامانه
                                </ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
