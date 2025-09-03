'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import { Card, Typography } from '@/src/components/shared'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/src/components/ui'

import type { User } from '@/src/types'

const { Paragraph } = Typography

type Props = {
  user: User
}

export const UserCard = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const t = useTranslations()

  const slides = user.documents?.map(({ fileUrl }) => ({ src: fileUrl })) || []

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer p-4">
          <div>{user.userId}</div>
        </Card>
      </DialogTrigger>

      <DialogContent className="min-h-[20dvh] w-fit min-w-[300px] p-6">
        <DialogHeader>
          <DialogTitle>{t('documents')}</DialogTitle>
        </DialogHeader>

        {slides.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {slides.map((slide, index) => (
              <Image
                key={index}
                width={180}
                height={180}
                src={slide.src}
                alt={`Document ${index + 1}`}
                className="size-40 cursor-pointer rounded border object-cover"
                onClick={() => {
                  setCurrentIndex(index)
                  setIsOpen(true)
                }}
              />
            ))}
          </div>
        ) : (
          <Paragraph>{t('noDocuments')}</Paragraph>
        )}

        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={slides}
          index={currentIndex}
          render={{
            slide: ({ slide }) => (
              <Image
                src={slide.src}
                width={300}
                height={280}
                alt=""
                className="h-auto max-h-[80vh] w-full object-contain"
              />
            )
          }}
        />

        <Button>{t('acceptDocuments')}</Button>
      </DialogContent>
    </Dialog>
  )
}
