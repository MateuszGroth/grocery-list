import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from 'features/counter/counterSlice'
import groceryReducer, { grocerySliceMiddleware } from 'features/grocery/grocerySlice'
import { authSliceReducer, authSliceMiddleware } from 'features'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSliceReducer,
    grocery: groceryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authSliceMiddleware, grocerySliceMiddleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
