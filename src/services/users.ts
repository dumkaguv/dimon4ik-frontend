import { axiosInstance } from './axiosInstance'
import { paths } from '../config/paths'

import type { ApiResponse, User } from '@/src/types'

export const getUser = async () => {
  return (await axiosInstance.get<ApiResponse<User>>(`${paths.users.me}`)).data
}

export const getUserById = async (id: string) => {
  return (await axiosInstance.get<ApiResponse<User>>(`${paths.users.byId(id)}`))
    .data
}
