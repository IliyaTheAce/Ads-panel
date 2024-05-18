import { useAppDispatch, useAppSelector } from '@/store'
import { Field, FieldProps, Form, Formik } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import * as Yup from 'yup'
import { Card, Notification, Select, toast } from '@/components/ui'
import { AdaptableCard } from '@/components/shared'
import CreatableSelect from 'react-select/creatable'
import { ApiCreatePublisher } from '@/services/PublishersService'
import { useNavigate } from 'react-router-dom'
import { CostMode, SelectBoxType } from '@/@types/common'

interface valuesTypes {
    title: string
    cost_id: number
    user_id: number
    domain: string
    categories: SelectBoxType[]
}

const initialValues: valuesTypes = {
    title: '',
    cost_id: 1,
    domain: '',
    user_id: 0,
    categories: [],
}
export default function PublisherCreate() {
    const { createSideBarOpen: isOpen } = useAppSelector(
        (state) => state.app.app
    )
    const dispatch = useAppDispatch()
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('لطفا نام را وارد کنید'),
        domain: Yup.string().required('لطفا دامنه را وارد کنید'),
    })
    const { categories } = useAppSelector((state) => state.app.app.commonData)

    const nav = useNavigate()
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, helpers) => {
                    const categories: number[] = []
                    values.categories.map((item) => {
                        categories.push(item.value)
                    })
                    ApiCreatePublisher({ ...values, categories })
                        .then((response) => {
                            if (response.data.result) {
                                toast.push(
                                    <Notification
                                        title={'عملیات موفق'}
                                        type="success"
                                        duration={2500}
                                    >
                                        پخش کننده با موفقیت ایجاد شد.
                                    </Notification>,
                                    {
                                        placement: 'top-end',
                                    }
                                )
                                nav('/app/publishers')
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
                        <Card header={'پخش کننده جدید'}>
                            <FormContainer layout={'horizontal'} size={'md'}>
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
                                    label="دامنه"
                                    invalid={
                                        (errors.domain &&
                                            touched.domain) as boolean
                                    }
                                    errorMessage={errors.domain}
                                    className={'shrink-0'}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="true"
                                        name="domain"
                                        placeholder="دامنه"
                                        component={Input}
                                    />
                                </FormItem>
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
                                <FormItem
                                    label="مدل هزینه"
                                    invalid={
                                        (errors.cost_id &&
                                            touched.cost_id) as boolean
                                    }
                                    errorMessage={errors.cost_id}
                                    className={'shrink-0 min-w-[300px]'}
                                >
                                    <Select<SelectBoxType>
                                        value={CostMode.filter(
                                            (color) =>
                                                color.value === values.cost_id
                                        )}
                                        className={'min-w-[200px]'}
                                        options={CostMode}
                                        onChange={(opt) =>
                                            setFieldValue('cost_id', opt?.value)
                                        }
                                    />
                                </FormItem>
                            </FormContainer>
                            <Button
                                className={'px-10'}
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'در حال انجام...'
                                    : 'ایجاد پخش کننده'}
                            </Button>
                        </Card>
                    </Form>
                )}
            </Formik>
        </AdaptableCard>
    )
}
