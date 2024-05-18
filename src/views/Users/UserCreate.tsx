import { Field, Form, Formik } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import * as Yup from 'yup'
import { AdaptableCard } from '@/components/shared'
import { useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/shared/PasswordInput'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import useAuth from '@/utils/hooks/useAuth'

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

export default function UserCreate() {
    const nav = useNavigate()
    const { signUp } = useAuth()

    const onSignUp = async (
        values: SignUpFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        // const { user, password, email } = values
        setSubmitting(true)
        const result = await signUp(values)

        if (result?.result) {
            nav(`${APP_PREFIX_PATH}/users`)
        }

        setSubmitting(false)
    }

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    onSignUp(values, setSubmitting)
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
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </AdaptableCard>
    )
}
