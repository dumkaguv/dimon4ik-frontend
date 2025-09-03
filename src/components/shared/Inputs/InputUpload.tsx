'use client'

import { useTranslations } from 'next-intl'
import { type ChangeEvent, type ComponentProps, useState } from 'react'
import {
  type ControllerRenderProps,
  type FieldValues,
  useFormContext
} from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from '@/src/components/ui'

type UploadInputProps = {
  name: string
  label?: string
  accept?: string
  multiple?: boolean
  maxSizeMB?: number
} & ComponentProps<'input'>

export const InputUpload = ({
  name,
  label,
  accept,
  multiple,
  maxSizeMB,
  ...props
}: UploadInputProps) => {
  const { control, setError } = useFormContext()
  const [fileNames, setFileNames] = useState<string[]>([])

  const t = useTranslations()

  const validateFilesSize = (files: File[]) =>
    files.every((file) => {
      if (file.size > (maxSizeMB ?? Infinity) * 1024 * 1024) {
        setError(name, {
          type: 'manual',
          message: t('fileTooLarge', { maxFileSizeMb: maxSizeMB ?? 0 })
        })
        return false
      }
      return true
    })

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (!files.length) return

    const isValidFileSizes = validateFilesSize(files)

    if (isValidFileSizes) {
      setFileNames(files.map((f) => f.name))
      field.onChange(multiple ? files : (files[0] ?? null))

      props.onChange?.(e)
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={(e) => onChange(e, field)}
              className="h-10 cursor-pointer"
            />
          </FormControl>
          {fileNames.length > 0 && (
            <div className="text-muted-foreground mt-2 flex flex-col gap-1 text-xs">
              {fileNames.map((name, idx) => (
                <span key={idx}>📄 {name}</span>
              ))}
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
