import { Field, FieldProps, Form, Formik } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import * as Yup from 'yup'
import { Card, Checkbox, Notification, Select, toast } from '@/components/ui'

import { DatePicker } from 'zaman'
import { useEffect, useState } from 'react'
import { AdaptableCard, Loading } from '@/components/shared'
import { ApiEditCampaign, GetCampaign } from '@/services/CampiagnsService'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'
import { useAppSelector } from '@/store'
import { CostMode, SelectBoxType } from '@/@types/common'
import CreatableSelect from 'react-select/creatable'

interface valuesTypes {
    categories: SelectBoxType[]
    title: string
    type: string
    budget: number
    budget_daily: number
    start_time: string
    end_time: string
    is_enabled: boolean
    is_escapable: boolean
    cost_mode: number
    link: string
}

export default function CampaignCreate() {
    const [initialValues, setInitialValues] = useState<valuesTypes>({
        title: '',
        budget: 0,
        budget_daily: 0,
        categories: [],
        cost_mode: 1,
        end_time: '',
        is_enabled: false,
        is_escapable: false,
        link: '',
        type: 'VIDEO',
        start_time: '',
    })
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('لطفا نام را وارد کنید'),
        link: Yup.string().required('لطفا لینک را وارد کنید'),
        budget: Yup.number().required('لطفا بودجه را وارد کنید'),
        budget_daily: Yup.number().required('لطفا بودجه روزانه را وارد کنید'),
        start_time: Yup.string().required('لطفا تاریح شروع را وارد کنید'),
        end_time: Yup.string().optional(),
    })
    const { id } = useParams()

    const { categories } = useAppSelector((state) => state.app.app.commonData)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!id) return
        GetCampaign(id).then((response) => {
            const camp = response.data.data.campaign
            const categories: SelectBoxType[] = []
            camp.categories.map((item) => {
                categories.push({ value: item.id, label: item.name })
            })
            setInitialValues({
                ...camp,
                categories,
                is_enabled: camp.is_enabled === 1,
                is_escapable: camp.is_escapable === 1,
            })
            setLoading(false)
        })
    }, [])

    const nav = useNavigate()

    return (
        <Loading loading={loading}>
            <AdaptableCard className="h-full" bodyClass="h-full">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, helpers) => {
                        if (!id) return
                        const categories: number[] = []
                        values.categories.map((item) => {
                            categories.push(item.value)
                        })
                        //TODO: There are errors in response
                        ApiEditCampaign(id, {
                            ...values,
                            categories,
                            is_enabled: values.is_enabled ? 1 : 0,
                            is_escapable: values.is_escapable ? 1 : 0,
                        })
                            .then((response) => {
                                if (response.data.result) {
                                    toast.push(
                                        <Notification
                                            title={'عملیات موفق'}
                                            type="success"
                                            duration={2500}
                                        >
                                            دسته بندی با موفقیت ایجاد شد.
                                        </Notification>,
                                        {
                                            placement: 'top-end',
                                        }
                                    )
                                    nav('/app/campaigns')
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
                    {({
                        touched,
                        errors,
                        isSubmitting,
                        setFieldValue,
                        values,
                    }) => (
                        <Form>
                            <Card
                                title={'مشخصات کمپین'}
                                header={'مشخصات کمپین'}
                            >
                                <FormContainer layout={'inline'} size={'md'}>
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
                                            className={'min-w-[300px]'}
                                            placeholder="عنوان"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="مدل هزینه"
                                        invalid={
                                            (errors.cost_mode &&
                                                touched.cost_mode) as boolean
                                        }
                                        errorMessage={errors.cost_mode}
                                        className={'shrink-0'}
                                    >
                                        <Select<SelectBoxType>
                                            value={CostMode.filter(
                                                (color) =>
                                                    color.value ===
                                                    values.cost_mode
                                            )}
                                            options={CostMode}
                                            className={'min-w-[200px]'}
                                            onChange={(opt) =>
                                                setFieldValue(
                                                    'cost_mode',
                                                    opt?.value
                                                )
                                            }
                                        />
                                    </FormItem>
                                </FormContainer>
                                <FormItem
                                    label="دسته بندی"
                                    invalid={
                                        (errors.categories &&
                                            touched.categories) as unknown as boolean
                                    }
                                    errorMessage={errors.categories as string}
                                    className={'shrink-0'}
                                >
                                    <Field name={'categories'}>
                                        {({ field, form }: FieldProps) => (
                                            <Select
                                                placeholder={'انتخاب کنید...'}
                                                isMulti
                                                componentAs={CreatableSelect}
                                                form={form}
                                                field={field}
                                                value={values.categories}
                                                className={'min-w-[200px]'}
                                                options={categories}
                                                onChange={(options) => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        options
                                                    )
                                                }}
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                            </Card>
                            <Card
                                title={'مالی'}
                                header={'مالی'}
                                className={'mt-5'}
                            >
                                <FormContainer layout={'inline'} size={'md'}>
                                    <FormItem
                                        label="بودجه"
                                        invalid={
                                            (errors.budget &&
                                                touched.budget) as boolean
                                        }
                                        errorMessage={errors.budget}
                                        className={'shrink-0'}
                                    >
                                        <Field
                                            type="number"
                                            name="budget"
                                            placeholder="بودجه"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="بودجه روزانه"
                                        invalid={
                                            (errors.budget_daily &&
                                                touched.budget_daily) as boolean
                                        }
                                        errorMessage={errors.budget_daily}
                                        className={'shrink-0'}
                                    >
                                        <Field
                                            type="number"
                                            name="budget_daily"
                                            placeholder="بودجه روزانه"
                                            component={Input}
                                        />
                                    </FormItem>
                                </FormContainer>
                            </Card>
                            <Card
                                title={'زمان بندی'}
                                header={'زمان بندی'}
                                className={'mt-5'}
                            >
                                <FormContainer layout={'inline'} size={'md'}>
                                    <FormItem
                                        label="تاریخ شروع"
                                        invalid={
                                            (errors.start_time &&
                                                touched.start_time) as boolean
                                        }
                                        errorMessage={errors.start_time}
                                        className={'shrink-0'}
                                    >
                                        <DatePicker
                                            locale={'fa'}
                                            round={'x2'}
                                            inputClass={classNames('input')}
                                            inputAttributes={{
                                                placeholder: 'تاریخ شروع',
                                            }}
                                            defaultValue={values.start_time}
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'start_time',
                                                    e?.value
                                                        .toISOString()
                                                        .split('T')[0]
                                                )
                                            }}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="تاریخ پایان"
                                        invalid={
                                            (errors.end_time &&
                                                touched.end_time) as boolean
                                        }
                                        errorMessage={errors.end_time}
                                        className={'shrink-0'}
                                    >
                                        <DatePicker
                                            locale={'fa'}
                                            round={'x2'}
                                            defaultValue={values.end_time}
                                            inputClass={classNames('input')}
                                            inputAttributes={{
                                                placeholder: 'تاریخ پایان',
                                            }}
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'end_time',
                                                    e?.value
                                                        .toISOString()
                                                        .split('T')[0]
                                                )
                                            }}
                                        />
                                    </FormItem>
                                </FormContainer>
                            </Card>
                            <Card
                                title={'محتوا'}
                                header={'محتوا'}
                                className={'mt-5'}
                            >
                                <FormContainer
                                    layout={'horizontal'}
                                    size={'md'}
                                >
                                    <FormItem
                                        label="لینک"
                                        invalid={
                                            (errors.link &&
                                                touched.link) as boolean
                                        }
                                        errorMessage={errors.link}
                                        className={'shrink-0'}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="true"
                                            name="link"
                                            placeholder="لینک"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="قابل رد کردن"
                                        invalid={
                                            (errors.is_escapable &&
                                                touched.is_escapable) as boolean
                                        }
                                        errorMessage={errors.is_escapable}
                                        className={'shrink-0'}
                                        layout={'horizontal'}
                                    >
                                        <Checkbox
                                            checked={values.is_escapable}
                                            onChange={(value) => {
                                                setFieldValue(
                                                    'is_escapable',
                                                    value
                                                )
                                            }}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="فعال"
                                        invalid={
                                            (errors.is_enabled &&
                                                touched.is_enabled) as boolean
                                        }
                                        errorMessage={errors.is_enabled}
                                        className={'shrink-0'}
                                        layout={'horizontal'}
                                    >
                                        <Checkbox
                                            checked={values.is_enabled}
                                            onChange={(value) => {
                                                setFieldValue(
                                                    'is_enabled',
                                                    value
                                                )
                                            }}
                                        />
                                    </FormItem>
                                </FormContainer>
                            </Card>
                            <Button
                                className={'px-10 mt-5'}
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'در حال انجام...'
                                    : 'ویرایش کمپین'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </AdaptableCard>
        </Loading>
    )
}
