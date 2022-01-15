import type { AuthState } from 'types'

export const getInitialAuthState = () => {
  const initialState: AuthState = {
    user: null,
    token: null,
    tokenExpDateTime: null,
    isLoading: false,
  }

  let localStorageAuthState
  try {
    localStorageAuthState = JSON.parse(localStorage.getItem('auth') || '') as AuthState
  } catch (e) {}

  if (!localStorageAuthState?.token) {
    return initialState
  }

  const hasExpirationDate = !!localStorageAuthState.tokenExpDateTime
  if (!hasExpirationDate) {
    initialState.user = localStorageAuthState.user
    initialState.token = localStorageAuthState.token

    return initialState
  }

  const isTokenExpired = new Date() > new Date(localStorageAuthState?.tokenExpDateTime || 0)
  if (!isTokenExpired) {
    initialState.user = localStorageAuthState.user
    initialState.token = localStorageAuthState.token
    initialState.tokenExpDateTime = +(localStorageAuthState.tokenExpDateTime || 0)
  } else {
    localStorage.setItem('auth', '')
  }

  return initialState
}

export const getTokenExpDateTime = (expiresIn: number | null): number => {
  const currentTime = new Date().getTime()
  if (!expiresIn) {
    return currentTime + 1000 * 60 * 60 * 24 // 24h
  }

  return currentTime + expiresIn
}
