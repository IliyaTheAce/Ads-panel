import { HiTrash } from 'react-icons/hi'
import { Upload } from '@/components/ui'
import { ConfirmDialog, DoubleSidedImage } from '@/components/shared'
import { FormItem } from '@/components/ui/Form'
import { Field, FieldProps } from 'formik'
import { useState } from 'react'
import appConfig from '@/configs/app.config'

interface ContentProps {
    content?: File
}
export default function ContentUploader(values: ContentProps) {
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const { apiPrefix } = appConfig
    const beforeUpload = (file: FileList | null) => {
        let valid: boolean | string = true

        const allowedFileType = ['video/mp4']

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'پسوند فایل پشتیبانی نمیشود'
                }
            }
        }
        return valid
    }

    return (
        <FormItem label="فایل محتوا">
            <Field name={'file'}>
                {({ form }: FieldProps) => {
                    return (
                        <>
                            {values.content ? (
                                <div className="group relative rounded border p-2 flex">
                                    <video className="rounded  max-w-full">
                                        <source
                                            src={URL.createObjectURL(
                                                values.content
                                            )}
                                        />
                                    </video>
                                    <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                                        <span
                                            className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                                            onClick={() =>
                                                setDeleteConfirmationOpen(true)
                                            }
                                        >
                                            <HiTrash />
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <Upload
                                    draggable
                                    multiple={false}
                                    accept={'video/mp4'}
                                    beforeUpload={beforeUpload}
                                    showList={false}
                                    onChange={(files) =>
                                        form.setFieldValue('file', files[0])
                                    }
                                >
                                    <div className="my-16 text-center">
                                        <DoubleSidedImage
                                            className="mx-auto"
                                            src="/img/others/upload.png"
                                            darkModeSrc="/img/others/upload-dark.png"
                                        />
                                        <p className="font-semibold">
                                            <span className="text-gray-800 dark:text-white">
                                                محتوا را بکشید و رها کنید یا
                                            </span>
                                            <span className="text-blue-500">
                                                {' '}
                                                از فایل ها انتخاب کنید
                                            </span>
                                        </p>
                                        <p className="mt-1 opacity-60 dark:text-white">
                                            پسوند ها پشتیبانه شده: mp4
                                        </p>
                                    </div>
                                </Upload>
                            )}
                            <ConfirmDialog
                                isOpen={deleteConfirmationOpen}
                                type="danger"
                                title="حذف محتوا"
                                confirmText={'تایید'}
                                cancelText={'صرف نظر'}
                                confirmButtonColor="red-600"
                                onConfirm={() => {
                                    form.setFieldValue('file', undefined)
                                    setDeleteConfirmationOpen(false)
                                }}
                                onClose={() => {
                                    setDeleteConfirmationOpen(false)
                                }}
                                onCancel={() => {
                                    setDeleteConfirmationOpen(false)
                                }}
                            >
                                <p>آیا از حذف محتوا مطمعن هستید؟</p>
                            </ConfirmDialog>
                        </>
                    )
                }}
            </Field>
        </FormItem>
    )
}
