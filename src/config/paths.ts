const AUTH_PREFIX = '/auth'
const PROFILE_PREFIX = '/profile'
const USERS_PREFIX = '/users'
const AUTHORIZED = '/authorized'

export const paths = {
  root: '/',

  auth: {
    login: `${AUTH_PREFIX}/login`,
    register: `${AUTH_PREFIX}/register`
  },

  users: {
    root: `${USERS_PREFIX}`,
    byId: (id: string) => `${USERS_PREFIX}/${id}`
  },

  profile: {
    root: `${AUTHORIZED}${PROFILE_PREFIX}`
  }
} as const
