import { ApiRoutes } from './apiRoutes'
import { axiosInstance } from './axiosInstance'

import type { ApiResponse, Crypto } from '@/src/types'

export const getCryptos = async () => {
  return (
    await axiosInstance.get<ApiResponse<Crypto[]>>(`${ApiRoutes.crypto.root}`)
  ).data
}

export const updateCryptoMarkup = async (id: number, markupPct: number) => {
  return (
    await axiosInstance.patch<ApiResponse<Crypto>>(
      ApiRoutes.crypto.updateMarkup(id),
      { markupPct }
    )
  ).data
}

export const updateCryptoPrice = async (price: number, source: string) => {
  return (
    await axiosInstance.patch<ApiResponse<Crypto>>(
      ApiRoutes.crypto.updateMarkup(id),
      { source }
    )
  ).data
}
