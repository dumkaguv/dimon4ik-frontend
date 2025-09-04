export const LocalStorage = {
  token: 'token'
} as const

export const Cookies = {
  refreshToken: 'refreshToken',
  locale: 'NEXT_LOCALE'
} as const

export const QueryKeys = {
  users: {
    root: 'users',
    me: 'me'
  },

  crypto: {
    root: 'crypto',
    prices: 'cryptoPrices'
  }
} as const
