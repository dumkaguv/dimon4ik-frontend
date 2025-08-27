import axios from 'axios'

import { LocalStorage } from '@/src/constants'
import { getAccessToken, saveAccessToken } from '@/src/utils'

import { ApiRoutes } from './apiRoutes'

import type { ApiResponse, AuthResponse } from '@/src/types'

const baseURL = process.env.NEXT_PUBLIC_API_URL
const loginPage = `${process.env.NEXT_PUBLIC_FRONT_URL}/en/auth/login`

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await axios.get<ApiResponse<AuthResponse>>(
          baseURL + ApiRoutes.auth.refresh,
          {
            withCredentials: true
          }
        )

        const newAccessToken = response.data.data?.tokens.accessToken
        if (!newAccessToken) {
          localStorage.removeItem(LocalStorage.token)
          return (window.location.href = loginPage)
        }
        saveAccessToken(newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)
