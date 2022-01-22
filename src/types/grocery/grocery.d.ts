export interface GroceryState {
  list: Array<GroceryItem>
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
  color: string
  darkModeColor: string
  key: CategoryKey
}

export type Product = {
  label: string
  category: CategoryKey | string
}

export type Unit = 'szt' | 'kg' | 'L'
export interface GroceryItem {
  product: string
  unit: Unit
  amount: number
  category: CategoryKey | string
  id?: string
  comment?: string
}
