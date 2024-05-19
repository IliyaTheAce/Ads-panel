import { Field, Form, Formik } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import * as Yup from 'yup'
import { AdaptableCard, Loading } from '@/components/shared'
import PasswordInput from '../../components/shared/PasswordInput'
import { useEffect, useState } from 'react'
import { GetProfile, UpdateProfile } from '@/services/ProfileService'
import { Notification, toast } from '@/components/ui'

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
    password_confirmation: Yup.string().oneOf(
        [Yup.ref('password')],
        'رمز های عبور وارد شده یکسان نیستند!'
    ),
    username: Yup.string().required('لطفا نام کاربری را وارد کنید.'),
})

export default function UserCreate() {
    const [initialValues, setInitialValues] = useState<SignUpFormSchema>({
        firstname: '',
        lastname: '',
        password_confirmation: '',
        password: '',
        email: '',
        username: '',
        mobile: '',
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        GetProfile().then((response) => {
            setInitialValues({
                ...response.data.data.user,
                password: '',
                password_confirmation: '',
            })
            setLoading(false)
        })
    }, [])

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <Loading loading={loading}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setLoading(true)
                        UpdateProfile({ data: values }).then((response) => {
                            if (response.data.result) {
                                GetProfile().then((response) => {
                                    setInitialValues({
                                        ...response.data.data.user,
                                        password: '',
                                        password_confirmation: '',
                                    })
                                    setLoading(false)
                                })
                                toast.push(
                                    <Notification
                                        title={'بروزرسانی پروفایل'}
                                        type={'success'}
                                    >
                                        با موفقیت بروز رسانی شد.
                                    </Notification>
                                )
                            } else {
                                toast.push(
                                    <Notification
                                        title={'بروزرسانی پروفایل'}
                                        type={'danger'}
                                    >
                                        عملیات به مشکل برخورد.
                                    </Notification>
                                )
                                setLoading(false)
                            }
                        })
                    }}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <Form className={'pb-10'}>
                            <FormContainer>
                                <FormItem
                                    label="نام"
                                    invalid={
                                        errors.firstname && touched.firstname
                                    }
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
                                    invalid={
                                        errors.lastname && touched.lastname
                                    }
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
                                    invalid={
                                        errors.username && touched.username
                                    }
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
                                    invalid={
                                        errors.password && touched.password
                                    }
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
                                        : 'بروزرسانی'}
                                </Button>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </Loading>
        </AdaptableCard>
    )
}
