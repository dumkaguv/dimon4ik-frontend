import { toast } from 'react-hot-toast'

import type { AxiosError } from 'axios'

type ApiResponse = { message: string }

export const showApiErrors = (
  error: unknown,
  t: (key: string) => string,
  message?: string
) => {
  const axiosError = error as AxiosError<ApiResponse>
  toast.error(axiosError.response?.data.message ?? message ?? t('errorGeneric'))

  console.error(error)
}
