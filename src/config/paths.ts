const AUTH_PREFIX = '/auth'
const PROFILE_PREFIX = '/profile'
const USERS_PREFIX = '/users'
const AUTHORIZED = '/authorized'
const SETTINGS = '/settings'

export const paths = {
  root: '/',

  auth: {
    login: `${AUTH_PREFIX}/login`,
    register: `${AUTH_PREFIX}/register`
  },

  users: {
    root: `${USERS_PREFIX}`,
    me: `${USERS_PREFIX}/me`,
    byId: (id: string) => `${USERS_PREFIX}/${id}`,
    all: `${USERS_PREFIX}/all`
  },

  profile: {
    root: `${AUTHORIZED}${PROFILE_PREFIX}`,
    verification: `${AUTHORIZED}${PROFILE_PREFIX}/verification`,
    users: `${AUTHORIZED}${PROFILE_PREFIX}${USERS_PREFIX}`
  },

  settings: {
    root: `${AUTHORIZED}${PROFILE_PREFIX}${SETTINGS}`
  }
} as const
