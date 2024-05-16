import { Drawer } from '@/components/ui/Drawer'
import { useAppDispatch, useAppSelector } from '@/store'
import { toggleEditSideBar } from '@/store/slices/app'
import { Field, Form, Formik } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Loading } from '@/components/shared'
import Button from '@/components/ui/Button'
import * as Yup from 'yup'
import { createRef, useEffect, useState } from 'react'
import { GetCategory, UpdateCategory } from '@/services/CategoriesService'
import { AiFillPicture } from 'react-icons/ai'
import appConfig from '@/configs/app.config'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

interface valuesTypes {
    _id: string
    title: string
    picture: File | null
    cover: File | null
    order: number
}
export default function CategoryEditDrawer({
    onSuccess,
}: {
    onSuccess: () => void
}) {
    const { apiPrefix } = appConfig
    const { editSideBarOpen: isOpen, selectedId } = useAppSelector(
        (state) => state.app.app
    )
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState<boolean>(true)
    const [initialValues, setInitialValues] = useState<valuesTypes>({
        _id: '',
        title: '',
        picture: null,
        order: 0,
        cover: null,
    })
    const pictureRef = createRef<HTMLInputElement>()
    const coverRef = createRef<HTMLInputElement>()
    const [previewCover, setPreviewCover] = useState<string | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [canBeSubmitted, setCanBeSubmitted] = useState<boolean>(false)
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('لطفا نام را وارد کنید'),
        order: Yup.number().required('لطفا ترتیب را وارد کنید'),
    })

    useEffect(() => {
        if (!isOpen) return
        setLoading(true)
        GetCategory(selectedId as string).then((response) => {
            setInitialValues({
                ...response.data.category,
                picture: null,
                cover: null,
            })
            setPreview(`${apiPrefix}${response.data.category.picture}`)
            setPreviewCover(`${apiPrefix}${response.data.category.cover}`)
            setLoading(false)
        })
    }, [isOpen])

    return (
        <Drawer
            isOpen={isOpen}
            onClose={() => {
                dispatch(toggleEditSideBar(false))
            }}
        >
            {loading ? (
                <Loading loading={true} />
            ) : (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, helpers) => {
                        if (!canBeSubmitted) {
                            helpers.setSubmitting(false)
                            return
                        }
                        const formData = new FormData()
                        formData.append('title', values.title)
                        formData.append('order', values.order.toString())
                        if (values.picture) {
                            formData.append(
                                'picture',
                                pictureRef.current?.files?.[0] as File
                            )
                        } else {
                            if (preview) {
                                formData.append(
                                    'picture',
                                    preview.split(apiPrefix)[1]
                                )
                            }
                        }
                        if (values.cover) {
                            formData.append(
                                'cover',
                                coverRef.current?.files?.[0] as File
                            )
                        } else {
                            if (previewCover) {
                                formData.append(
                                    'cover',
                                    previewCover.split(apiPrefix)[1]
                                )
                            }
                        }
                        UpdateCategory(initialValues._id, formData)
                            .then((response) => {
                                if (response.data.success) {
                                    dispatch(toggleEditSideBar(false))
                                    toast.push(
                                        <Notification
                                            title={'عملیات موفق'}
                                            type="success"
                                            duration={2500}
                                        >
                                            دسته بندی با موفقیت بروز شد.
                                        </Notification>,
                                        {
                                            placement: 'top-end',
                                        }
                                    )
                                    setCanBeSubmitted(false)
                                    onSuccess()
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
                        submitForm,
                        errors,
                        isSubmitting,
                        setFieldValue,
                    }) => (
                        <Form>
                            <FormContainer layout={'vertical'} size={'md'}>
                                <FormItem
                                    label="تیتر"
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
                                        placeholder="تیتر"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="اولویت ترتیب"
                                    invalid={
                                        (errors.order &&
                                            touched.order) as boolean
                                    }
                                    errorMessage={errors.order}
                                    className={'shrink-0'}
                                >
                                    <Field
                                        type="number"
                                        autoComplete="true"
                                        name="order"
                                        placeholder="اولویت ترتیب"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="تصویر"
                                    invalid={
                                        (errors.picture &&
                                            touched.picture) as boolean
                                    }
                                    errorMessage={errors.picture}
                                    className={'shrink-0'}
                                >
                                    <Button
                                        variant="solid"
                                        size="sm"
                                        icon={<AiFillPicture />}
                                        onClick={() => {
                                            if (!pictureRef) return
                                            pictureRef.current?.click()
                                        }}
                                    >
                                        انتخاب عکس
                                    </Button>
                                    <input
                                        ref={pictureRef}
                                        type={'file'}
                                        hidden={true}
                                        multiple={false}
                                        name={'picture'}
                                        onChange={(event) => {
                                            setFieldValue(
                                                'picture',
                                                event.target.files
                                            )
                                            const file =
                                                event.target?.files?.[0]
                                            if (file)
                                                setPreview(
                                                    URL.createObjectURL(file)
                                                )
                                        }}
                                    />
                                    {preview && (
                                        <img
                                            src={preview}
                                            alt={'preview'}
                                            className={'w-32 h-auto'}
                                        />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="تصویر کاور"
                                    invalid={
                                        (errors.cover &&
                                            touched.cover) as boolean
                                    }
                                    errorMessage={errors.cover}
                                    className={'shrink-0'}
                                >
                                    <Button
                                        variant="solid"
                                        size="sm"
                                        icon={<AiFillPicture />}
                                        onClick={() => {
                                            if (!coverRef) return
                                            coverRef.current?.click()
                                        }}
                                    >
                                        انتخاب عکس
                                    </Button>
                                    <input
                                        ref={coverRef}
                                        type={'file'}
                                        hidden={true}
                                        multiple={false}
                                        name={'picture'}
                                        onChange={(event) => {
                                            setFieldValue(
                                                'cover',
                                                event.target.files
                                            )
                                            const file =
                                                event.target?.files?.[0]
                                            if (file)
                                                setPreviewCover(
                                                    URL.createObjectURL(file)
                                                )
                                        }}
                                    />
                                    {previewCover && (
                                        <img
                                            src={previewCover}
                                            alt={'preview'}
                                            className={'w-32 h-auto'}
                                        />
                                    )}
                                </FormItem>
                            </FormContainer>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="button"
                                onClick={() => {
                                    setCanBeSubmitted(true)
                                    submitForm()
                                }}
                            >
                                {isSubmitting
                                    ? 'در حال انجام...'
                                    : 'ویرایش دسته بندی'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            )}
        </Drawer>
    )
}
