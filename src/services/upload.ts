import { ApiRoutes } from './apiRoutes'
import { axiosInstance } from './axiosInstance'

import type { ApiResponse, UserDocument } from '@/src/types'

export const upload = async (file: File, type: UserDocument['type']) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', type)

  return (
    await axiosInstance.put<ApiResponse<UserDocument>>(
      ApiRoutes.upload.root,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  ).data
}
