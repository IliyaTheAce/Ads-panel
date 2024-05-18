import { Field, Form, Formik } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import * as Yup from 'yup'
import { Card, Notification, Select, toast } from '@/components/ui'
import { AdaptableCard } from '@/components/shared'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
    ApiCreateContent,
    GetContentCreateData,
} from '@/services/ContentsService'
import ContentUploader from '@/views/Videos/Components/ContentUploader'

interface valuesTypes {
    title: string
    file: File | undefined
    cuid: SelectBoxType
    url: string
}

const initialValues: valuesTypes = {
    title: '',
    cuid: { value: '', label: '' },
    file: undefined,
    url: '',
}

export type SelectBoxType = {
    label: string
    value: string
}

export default function ContentCreate() {
    const [campaigns, setCampaigns] = useState<SelectBoxType[]>([])
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('لطفا نام را وارد کنید'),
        url: Yup.string().required('لطفا آدرس صفحه لندیگ را وارد کنید'),
    })

    const nav = useNavigate()

    useEffect(() => {
        GetContentCreateData().then((response) => {
            const camps: SelectBoxType[] = []
            response.data.data.campaigns.map((item) => {
                camps.push({
                    label: item.title,
                    value: item.uid,
                })
            })

            setCampaigns(camps)
        })
    }, [])

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, helpers) => {
                    console.log(values)
                    if (!values.file) return
                    const formData = new FormData()
                    formData.append('file', values.file)
                    formData.append('title', values.title)
                    formData.append('cuid', values.cuid.value)
                    formData.append('url', values.url)

                    ApiCreateContent(formData)
                        .then((response) => {
                            if (response.data.result) {
                                toast.push(
                                    <Notification
                                        title={'عملیات موفق'}
                                        type="success"
                                        duration={2500}
                                    >
                                        محتوا بارگزاری شد.{' '}
                                    </Notification>,
                                    {
                                        placement: 'top-end',
                                    }
                                )
                                nav('/app/videos')
                            } else {
                                helpers.setErrors({
                                    title: response.data.message,
                                })
                            }
                            helpers.setSubmitting(false)
                        })
                        .catch((err) => {
                            helpers.setErrors({ title: err.message })
                            helpers.setSubmitting(false)
                        })
                }}
            >
                {({ touched, errors, isSubmitting, setFieldValue, values }) => (
                    <Form>
                        <Card header={'اضافه کردن محتول جدید'}>
                            <FormContainer layout={'vertical'} size={'md'}>
                                <FormItem
                                    label="عنوان"
                                    invalid={
                                        (errors.title &&
                                            touched.title) as boolean
                                    }
                                    errorMessage={errors.title}
                                    className={'shrink-0'}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="true"
                                        name="title"
                                        placeholder="عنوان"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="آدرس لندینگ پیج"
                                    invalid={
                                        (errors.url && touched.url) as boolean
                                    }
                                    errorMessage={errors.url}
                                    className={'shrink-0'}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="true"
                                        name="url"
                                        placeholder="آدرس لندینگ پیج"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="کمپین"
                                    invalid={
                                        (errors.cuid &&
                                            touched.cuid) as unknown as boolean
                                    }
                                    errorMessage={errors.cuid as string}
                                    className={'shrink-0'}
                                >
                                    <Select<SelectBoxType>
                                        placeholder={'انتخاب کنید...'}
                                        value={values.cuid}
                                        options={campaigns}
                                        onChange={(options) => {
                                            setFieldValue('cuid', options)
                                        }}
                                    />
                                </FormItem>
                                <ContentUploader content={values.file} />
                            </FormContainer>
                            <Button
                                className={'px-10'}
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'در حال انجام...'
                                    : 'ایجاد محتوا'}
                            </Button>
                        </Card>
                    </Form>
                )}
            </Formik>
        </AdaptableCard>
    )
}
