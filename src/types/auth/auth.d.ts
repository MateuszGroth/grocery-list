export interface User {
  id: string
  name: string
}

export interface AuthState {
  user: null | User
  token: null | string
  tokenExpDateTime: null | number
  isLoading: boolean
}
