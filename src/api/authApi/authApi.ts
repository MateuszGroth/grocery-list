import type { User } from 'types'
import { getTokenExpDateTime } from 'helpers'

// A mock function to mimic making an async request for data
export function getUserData(userName: string, password: string) {
  return new Promise<{ data: { user: User; token: string; expiresIn?: number; tokenExpDateTime: number } }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: {
            user: { id: 'abc', name: 'Marcin' },
            token: 'tokenMarcin',
            expiresIn: 1000 * 60 * 60,
            tokenExpDateTime: getTokenExpDateTime(1000 * 60 * 60),
          },
        }),
      500,
    ),
  )
}
