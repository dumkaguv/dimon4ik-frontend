'use client'

import { type ComponentProps, useState } from 'react'
import { useFormContext } from 'react-hook-form'

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
} & ComponentProps<'input'>

export const InputUpload = ({
  name,
  label,
  accept,
  multiple,
  ...props
}: UploadInputProps) => {
  const { control } = useFormContext()
  const [fileNames, setFileNames] = useState<string[]>([])

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
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : []
                setFileNames(files.map((f) => f.name))
                field.onChange(multiple ? files : (files[0] ?? null))

                props.onChange?.(e)
              }}
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
