import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import type { RootState } from 'store'

import type { GroceryItem, GroceryState } from 'types'

let initialState: GroceryState = {
  list: [],
}

try {
  const groceryStoredState = localStorage.getItem('grocery')
  if (groceryStoredState) {
    initialState = JSON.parse(groceryStoredState as string) as GroceryState
  }
} catch (e) {
  localStorage.setItem('grocery', '')
}

export const grocerySlice = createSlice({
  name: 'grocery',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addItem: (state, action: PayloadAction<GroceryItem & { id?: string }>) => {
      const newGroceryItem = { ...action.payload, id: uuidv4() }
      state.list = [...state.list, newGroceryItem]
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.list = state.list.filter(({ id }) => id !== action.payload.id)
    },
  },
})

export const { addItem, removeItem } = grocerySlice.actions

export const selectGroceryItems = (state: RootState) => state.grocery.list

export default grocerySlice.reducer
