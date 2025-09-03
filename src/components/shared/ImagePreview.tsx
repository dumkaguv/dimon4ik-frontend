'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui'
import { cn } from '@/src/utils'

type Props = {
  file?: File
  src?: string
  files?: File[]
  srcs?: string[]
  className?: string
}

export const ImagePreview = ({ file, src, files, srcs, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const t = useTranslations()

  const slides = useMemo(() => {
    if (files && files.length > 0) {
      return files.map((f) => ({ src: URL.createObjectURL(f) }))
    }
    if (srcs && srcs.length > 0) {
      return srcs.map((s) => ({ src: s }))
    }
    if (file) {
      return [{ src: URL.createObjectURL(file) }]
    }
    if (src) {
      return [{ src }]
    }
    return []
  }, [file, src, files, srcs])

  const onOpen = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }
  const onClose = () => setIsOpen(false)

  if (slides.length === 0) {
    return null
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {slides.map((slide, index) => (
          <Tooltip key={index}>
            <TooltipContent>{t('preview')}</TooltipContent>
            <TooltipTrigger asChild>
              <Image
                src={slide.src}
                width={120}
                height={100}
                onClick={() => onOpen(index)}
                alt=""
                className={cn(
                  'h-[100px] w-[120px] cursor-pointer rounded-sm object-cover',
                  className
                )}
              />
            </TooltipTrigger>
          </Tooltip>
        ))}
      </div>

      <Lightbox
        open={isOpen}
        close={onClose}
        slides={slides}
        index={currentIndex}
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
