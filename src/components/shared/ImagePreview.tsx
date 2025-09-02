'use client'

import Image from 'next/image'

import { useTranslations } from 'next-intl'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/src/components/ui'

import type { DialogTriggerProps } from '@radix-ui/react-dialog'

type Props = {
  file: File
} & DialogTriggerProps

export const ImagePreview = ({ file, ...props }: Props) => {
  const t = useTranslations()
  const src = URL.createObjectURL(file)

  return (
    <Dialog>
      <DialogTrigger {...props}>
        <Tooltip>
          <TooltipContent>{t('preview')}</TooltipContent>
          <TooltipTrigger asChild>
            <Image
              src={src}
              width={120}
              height={100}
              alt=""
              className="h-[100px] w-[120px] cursor-pointer rounded-sm object-cover"
            />
          </TooltipTrigger>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="w-max !max-w-full">
        <DialogTitle>{file.name}</DialogTitle>
        <Image
          src={src}
          width={800}
          height={600}
          alt=""
          className="!max-h-[80dvh] rounded-md"
          style={{ width: 'auto', height: 'auto' }}
        />
      </DialogContent>
    </Dialog>
  )
}
