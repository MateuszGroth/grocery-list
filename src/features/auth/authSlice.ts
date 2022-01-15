import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import type { AuthState } from 'types'
import { RootState } from 'store'
import { getInitialAuthState } from 'helpers'
import { getUserData } from 'api'

export const logIn = createAsyncThunk(
  'auth/logIn',
  async ({ userName, password }: { userName: string; password: string }) => {
    const response = await getUserData(userName, password)

    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),
  reducers: {
    setAuthState: (state, { payload: { user, token, tokenExpDateTime } }: PayloadAction<AuthState>) => {
      state = { ...state, user, token, tokenExpDateTime }
    },
    logOut: (state) => {
      state.user = null
      state.token = null
      state.tokenExpDateTime = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logIn.fulfilled, (state, action) => {
        const { user, token, tokenExpDateTime } = action.payload

        state.isLoading = false
        state.user = user
        state.token = token
        state.tokenExpDateTime = tokenExpDateTime
      })
  },
})

export const authSliceMiddleware = (state: any) => (next: any) => (action: any) => {
  if (action.type === 'auth/logOut') {
    localStorage.setItem('auth', '')
  } else if (action.type === 'auth/logIn/fulfilled') {
    const { user, token, tokenExpDateTime } = action.payload
    try {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          user,
          token,
          tokenExpDateTime,
        }),
      )
    } catch (e) {}
  }

  return next(action)
}

export const { setAuthState, logOut } = authSlice.actions

export const authSliceReducer = authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user

export const selectAuthState = (state: RootState) => state.auth

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState())
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount))
//     }
//   }
