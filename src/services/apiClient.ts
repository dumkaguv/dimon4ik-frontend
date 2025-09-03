import * as auth from './auth'
import * as crypto from './crypto'
import * as upload from './upload'
import * as users from './users'

export const Api = {
  auth,
  users,
  crypto,
  upload
} as const
