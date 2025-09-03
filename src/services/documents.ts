import { ApiRoutes } from './apiRoutes'
import { axiosInstance } from './axiosInstance'

import type { ApiResponse, UserDocument } from '@/src/types'

export const verifyDocument = async () => {
  return (
    await axiosInstance.get<ApiResponse<UserDocument>>(
      `${ApiRoutes.documents.root}`
    )
  ).data
}
