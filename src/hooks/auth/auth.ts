import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'

import { selectAuthState, logOut } from 'features'

export const useAuthService = () => {
  const dispatch = useAppDispatch()
  const { user, tokenExpDateTime } = useAppSelector(selectAuthState)

  useEffect(() => {
    if (!tokenExpDateTime) {
      return
    }

    const currentTime = new Date().getTime()
    const expiresIn = tokenExpDateTime - currentTime
    if (expiresIn < 0) {
      dispatch(logOut())

      return
    }

    const timeout = setTimeout(() => {
      dispatch(logOut())
    }, expiresIn)

    return () => {
      clearTimeout(timeout)
    }
  }, [tokenExpDateTime, dispatch])

  return user
}
