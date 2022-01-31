import { FunctionComponent } from 'react'

export interface GroceryState {
  list: Array<GroceryItem>
  isGrouping: boolean
  isEdited?: boolean
}

export type CategoryKey =
  | 'vegetable'
  | 'fruit'
  | 'nabial'
  | 'meat'
  | 'frozen'
  | 'spices'
  | 'bathroom'
  | 'spices'
  | 'sweets'
  | 'random'

export type Category = {
  label: string
  key: CategoryKey
  Icon?: FunctionComponent<any>
  getColor(themeMode: 'dark' | 'light'): string
  getIconColor(themeMode: 'dark' | 'light'): string
}

export type Product = {
  label: string
  category: CategoryKey | string
}

export type Unit = 'szt.' | 'kg' | 'L'
export interface GroceryItem {
  product: string
  unit: Unit
  amount: number
  category: CategoryKey | string
  id?: string
  comment?: string
}
