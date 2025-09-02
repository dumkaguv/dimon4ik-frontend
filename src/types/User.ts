import type { Profile, UserDocument } from './'

export type User = {
  userId: number
  email: string
  isActivated: boolean
  isVerifiedKYC: boolean
  activationLink: string
  createdAt: string
  updatedAt: string
  activatedAt: string

  profile?: Profile
  documents?: UserDocument[]
}
