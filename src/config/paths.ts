const AUTH_PREFIX = '/auth'

export const paths = {
  root: '/',
  auth: {
    login: `${AUTH_PREFIX}/login`,
    register: `${AUTH_PREFIX}/register`
  }
} as const
