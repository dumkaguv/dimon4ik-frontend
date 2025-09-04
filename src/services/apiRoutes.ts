export const ApiRoutes = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    registration: '/auth/registration'
  },

  users: {
    root: '/users',
    byId: (id: string) => `/users/${id}`
  },

  crypto: {
    root: '/crypto',
    updatePrice: ()
    updateMarkup: (id: number | string) => `/crypto/${id}/markup`
  },

  upload: {
    root: '/upload'
  },

  documents: {
    root: '/documents'
  }
} as const
