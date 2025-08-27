import { ApiRoutes } from './apiRoutes'
import { axiosInstance } from './axiosInstance'

import type { ApiResponse, AuthResponse } from '@/src/types'

export type RegistrationPayload = {
  email: string
  password: string
}

export const register = async (payload: RegistrationPayload) => {
  return (
    await axiosInstance.post<ApiResponse<AuthResponse>>(
      ApiRoutes.auth.registration,
      payload
    )
  ).data
}

export type LoginPayload = {
  email: string
  password: string
}

export const login = async (payload: LoginPayload) => {
  return (
    await axiosInstance.post<ApiResponse<AuthResponse>>(
      ApiRoutes.auth.login,
      payload
    )
  ).data
}

export const logout = async () => {
  return (await axiosInstance.post<ApiResponse>(ApiRoutes.auth.logout)).data
}

export const refresh = async () => {
  return (
    await axiosInstance.get<ApiResponse<AuthResponse>>(ApiRoutes.auth.logout)
  ).data
}
