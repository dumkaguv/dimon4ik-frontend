'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { type ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { toast } from 'sonner'

import { Card, ImagePreview, InputUpload } from '@/src/components/shared'
import { Button, Form } from '@/src/components/ui'

import {
  type DocumentsFormSchema,
  createDocumentsFormSchema
} from '@/src/features/profile/zod'
import { Api } from '@/src/services/apiClient'
import { showApiErrors } from '@/src/utils'

import type { UserDocument } from '@/src/types'

const MAX_SIZE_MB = 5

type UploadVariables = {
  file: File
  type: UserDocument['type']
}

export const Verification = () => {
  const [filePreviews, setFilePreviews] = useState<{ [key: string]: File }>({})

  const t = useTranslations()
  const schema = createDocumentsFormSchema(t)
  const form = useForm({
    resolver: zodResolver(schema)
  })

  const { mutateAsync: upload, isPending } = useMutation({
    mutationFn: ({ file, type }: UploadVariables) =>
      Api.upload.upload(file, type),
    onError: (e) => showApiErrors(e, t)
  })

  const onSubmit = async (documents: DocumentsFormSchema) => {
    if (documents.documentFRONT) {
      await upload({ file: documents.documentFRONT, type: 'FRONT' })
    }
    if (documents.documentBACK) {
      await upload({ file: documents.documentBACK, type: 'BACK' })
    }
    toast.success(t('uploadSuccess'))
  }

  const onUpload = (fieldName: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFilePreviews((prev) => ({
      ...prev,
      [fieldName]: file
    }))
  }

  return (
    <Card className="mx-auto h-fit w-full max-w-[750px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex w-full gap-10 max-lg:flex-col">
            <div className="flex w-full flex-col gap-2">
              <InputUpload
                name="documentFRONT"
                label={t('documentFrontSide')}
                accept="image/*"
                maxSizeMB={MAX_SIZE_MB}
                onChange={(e) => onUpload('documentFRONT', e)}
              />
              {filePreviews.documentFRONT && (
                <ImagePreview file={filePreviews.documentFRONT} />
              )}
            </div>

            <div className="flex w-full flex-col gap-2">
              <InputUpload
                name="documentBACK"
                label={t('documentBackSide')}
                accept="image/*"
                maxSizeMB={MAX_SIZE_MB}
                onChange={(e) => onUpload('documentBACK', e)}
              />
              {filePreviews.documentBACK && (
                <ImagePreview file={filePreviews.documentBACK} />
              )}
            </div>
          </div>

          <Button type="submit" loading={isPending} className="mt-5">
            {t('submit')}
          </Button>
        </form>
      </Form>
    </Card>
  )
}
