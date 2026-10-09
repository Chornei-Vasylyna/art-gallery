export const apiEndpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  artworks: {
    list: "/artworks",
    details: (id: string) => `/artworks/${id}`,
    create: "/artworks",
    update: (id: string) => `/artworks/${id}`,
    remove: (id: string) => `/artworks/${id}`,
  },
} as const;