export interface GroceryItem {
  name: string
  labels: Array<string>
  amount: number
  id: string
}

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
  key: CategoryKey
}

export type Product = {
  label: string
  category: CategoryKey | string
}
