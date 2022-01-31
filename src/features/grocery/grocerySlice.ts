import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import type { RootState } from 'store'

import type { GroceryItem, GroceryState } from 'types'

let initialState: GroceryState = {
  list: [],
  isGrouping: false,
}

try {
  const groceryStoredState = localStorage.getItem('grocery')
  if (groceryStoredState) {
    initialState = JSON.parse(groceryStoredState as string) as GroceryState
  }
} catch (e) {
  localStorage.setItem('grocery', '')
}

initialState.isEdited = false

export const grocerySlice = createSlice({
  name: 'grocery',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setIsGrouping: (state, action: PayloadAction<boolean>) => {
      state.isGrouping = action.payload
    },
    setIsEdited: (state, action: PayloadAction<boolean>) => {
      state.isEdited = action.payload
    },
    addItem: (state, action: PayloadAction<GroceryItem & { id?: string }>) => {
      const newGroceryItem = { ...action.payload, id: uuidv4() }
      const existingGroceryItem = state.list.find(
        (item) =>
          item.category === newGroceryItem.category &&
          item.product === newGroceryItem.product &&
          item.unit === newGroceryItem.unit,
      )

      if (!existingGroceryItem) {
        state.list = [newGroceryItem, ...state.list]
        return
      }
      const updatedExistingItem = { ...existingGroceryItem, amount: existingGroceryItem.amount + newGroceryItem.amount }
      state.list = [updatedExistingItem, ...state.list.filter((item) => item !== existingGroceryItem)]
    },
    removeAll: (state) => {
      state.list = []
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.list = state.list.filter(({ id }) => id !== action.payload.id)
    },
    removeItems: (state, action: PayloadAction<{ idList: string[] }>) => {
      state.list = state.list.filter(({ id }) => !action.payload.idList.includes(id as string))
    },
    editItem: (state, action: PayloadAction<{ id: string; itemChanges: Partial<GroceryItem> }>) => {
      if (!action.payload.itemChanges) {
        return
      }
      const item = state.list.find(({ id }) => id === action.payload.id)
      if (!item) {
        console.log('Invalid item id')
        return
      }

      const itemIndex = state.list.indexOf(item)
      const editedItem = { ...item, ...action.payload.itemChanges }
      state.list = [...state.list.slice(0, itemIndex), editedItem, ...state.list.slice(itemIndex + 1)]
    },
  },
})

export const { addItem, removeItem, editItem, removeItems, removeAll, setIsGrouping, setIsEdited } =
  grocerySlice.actions
export const grocerySliceMiddleware = (store: any) => (next: any) => (action: any) => {
  if (
    ['grocery/addItem', 'grocery/removeItem', 'grocery/editItem', 'grocery/removeItems', 'grocery/removeAll'].includes(
      action.type,
    )
  ) {
    store.getState().grocery.isEdited || store.dispatch(setIsEdited(true))
  }

  return next(action)
}

export const selectGroceryItems = (state: RootState) => state.grocery.list
export const selectIsGrouping = (state: RootState) => state.grocery.isGrouping
export const selectIsEdited = (state: RootState) => state.grocery.isEdited

export default grocerySlice.reducer
