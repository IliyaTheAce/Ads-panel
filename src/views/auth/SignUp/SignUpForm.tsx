import { FormItem, FormContainer } from '@/components/ui/Form'
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

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type SignUpFormSchema = {
    firstName: string
    lastName: string
    mobile: string
    password: string
    confirmPassword: string
    recommenderId: string

}
const phoneRegex =
  /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/gi
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('لطفا نام خود را وارد کنید.'),
    lastName: Yup.string().required('لطفا نام خانوادگی خود را وارد کنید.'),
    mobile: Yup.string()
        .matches(phoneRegex,'شماره تلفن نادرست است!')
        .required('لطفا شماره تلفن خود را وارد کنید.'),
    password: Yup.string().required('لطفا رمز عبور مورد نظر را وارد کنید.'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password')],
        'رمز های عبور وارد شده یکسان نیستند!'
  ),
    recommenderId: Yup.string().optional()
})

  const initialValues:SignUpFormSchema={
  firstName: '',
  lastName: '',
  recommenderId: '',
  password: '',
confirmPassword: '',
mobile: '',
}
const SignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const onSignUp = async (
        values: SignUpFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        // const { user, password, email } = values
        setSubmitting(true)
        const result = await signUp(values)

        if (result?.status === 'failed') {
            setMessage(result.message)
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
                                invalid={errors.firstName && touched.firstName}
                                errorMessage={errors.firstName}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="firstName"
                                    placeholder="نام"
                                    component={Input}
                                />
                            </FormItem><FormItem
                                label="نام خانوادگی"
                                invalid={errors.lastName && touched.lastName}
                                errorMessage={errors.lastName}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="lastName"
                                    placeholder="نام خانوادگی"
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
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                }
                                errorMessage={errors.confirmPassword}
                            >
                                <Field
                                    autoComplete="off"
                                    name="confirmPassword"
                                    placeholder="تایید رمز عبور"
                                    component={PasswordInput}
                                />
                            </FormItem>
                          <FormItem
                            label="کد معرف"
                            invalid={errors.recommenderId && touched.recommenderId}
                            errorMessage={errors.recommenderId}
                          >
                            <Field
                              type="text"
                              autoComplete="off"
                              name="recommenderId"
                              placeholder="کد معرف"
                              component={Input}
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
                                <ActionLink to={signInUrl}>ورود به سامانه</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
