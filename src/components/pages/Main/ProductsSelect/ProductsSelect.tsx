import { useMemo } from 'react'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import ListItemButton from '@mui/material/ListItemButton'

import { PRODUCTS, CATEGORIES } from 'constant'
import type { CategoryKey, Product, Category } from 'types'

type ProductsSelectProps = {
  inputValue: string
  onInputChange(newValue: string): void
  value: Product | null
  onChange(ev: any, value: any): any
  category: Category | null
}
const ProductsSelect = ({ value, onChange, category, inputValue, onInputChange }: ProductsSelectProps) => {
  const options = useMemo(() => {
    return PRODUCTS
    // if (category == null) return PRODUCTS

    // return PRODUCTS.filter(({ category: productCategory }) => productCategory === category.key)
  }, [])
  // }, [category])

  return (
    <Autocomplete
      // disablePortal
      freeSolo
      onChange={onChange}
      value={value}
      autoHighlight
      options={options}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        onInputChange(newInputValue)
      }}
      fullWidth
      clearText="Wyczyść"
      closeText="Zamknij"
      noOptionsText="Brak wyników"
      // getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <ListItemButton component="li" {...props}>
          {option.label}
          <Chip
            sx={{
              ml: 2,
              bgcolor: (theme) =>
                CATEGORIES?.[option.category as CategoryKey]?.getColor(theme.palette.mode) || 'primary.main',
              fontSize: (theme) => theme.typography.body2.fontSize,
              color: (theme) =>
                CATEGORIES?.[option.category as CategoryKey]?.getIconColor(theme.palette.mode) ||
                'primary.contrastText',
            }}
            label={CATEGORIES?.[option.category as CategoryKey]?.label || option.category}
          />
        </ListItemButton>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Wybierz Produkt"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off', // disable autocomplete and autofill,
          }}
        />
      )}
    />
  )
}

export default ProductsSelect
