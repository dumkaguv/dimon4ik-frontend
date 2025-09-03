'use client'

import Image from 'next/image'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui'

type Props = {
  file: File
}

export const ImagePreview = ({ file }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const t = useTranslations()

  const src = URL.createObjectURL(file)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  return (
    <>
      <Tooltip>
        <TooltipContent>{t('preview')}</TooltipContent>
        <TooltipTrigger asChild>
          <Image
            src={src}
            width={120}
            height={100}
            onClick={onOpen}
            alt=""
            className="h-[100px] w-[120px] cursor-pointer rounded-sm object-cover"
          />
        </TooltipTrigger>
      </Tooltip>
      <Lightbox
        open={isOpen}
        close={onClose}
        slides={[{ src }]}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 1.5,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2
        }}
      />
    </>
  )
}
