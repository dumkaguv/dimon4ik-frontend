'use client'

import { useTranslations } from 'next-intl'
import { type ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Card, ImagePreview, InputUpload } from '@/src/components/shared'
import { Button, Form } from '@/src/components/ui'

export const Verification = () => {
  const [filePreviews, setFilePreviews] = useState<{ [key: string]: File }>({})

  const t = useTranslations()
  const form = useForm()

  const onSubmit = (data: any) => {
    console.log('Form data:', data)
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
                onChange={(e) => onUpload('documentFRONT', e)}
              />
              {filePreviews.documentFRONT && (
                <ImagePreview
                  file={filePreviews.documentFRONT}
                  className="self-start"
                />
              )}
            </div>

            <div className="flex w-full flex-col gap-2">
              <InputUpload
                name="documentBACK"
                label={t('documentBackSide')}
                accept="image/*"
                onChange={(e) => onUpload('documentBACK', e)}
              />
              {filePreviews.documentBACK && (
                <ImagePreview
                  file={filePreviews.documentBACK}
                  className="self-start"
                />
              )}
            </div>
          </div>

          <Button type="submit" className="mt-5">
            {t('submit')}
          </Button>
        </form>
      </Form>
    </Card>
  )
}
