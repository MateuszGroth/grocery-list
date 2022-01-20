import { useMemo, useState } from 'react'

import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import ListItemButton from '@mui/material/ListItemButton'
import MenuItem from '@mui/material/MenuItem'

import { PRODUCTS, CATEGORIES } from 'constant'
import type { CategoryKey, Product, Category } from 'types'

const categoriesList = Object.values(CATEGORIES)

const AddProduct = () => {
  const [product, setProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const handleProductChange = (event: any, value: Product) => {
    setProduct(value)
    if (value == null) {
      setCategory(null)
    } else {
      setCategory(CATEGORIES[value?.category as CategoryKey])
    }
  }

  const handleCategoryChange = (event: any) => {
    const newCategoryKey = event.target.value
    if (newCategoryKey == null) {
      setCategory(null)
      return
    }
    setCategory(CATEGORIES[newCategoryKey as CategoryKey])
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <ProductsSelect value={product} onChange={handleProductChange} category={category} />
      </Grid>
      <Grid item xs={3}>
        <TextField select fullWidth label="Kategoria" value={category?.key || null} onChange={handleCategoryChange}>
          {categoriesList.map((category) => (
            <MenuItem key={category.label} value={category.key}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  )
}

type ProductsSelectProps = { value: Product | null; onChange(ev: any, value: any): any; category: Category | null }
const ProductsSelect = ({ value, onChange, category }: ProductsSelectProps) => {
  const options = useMemo(() => {
    if (category == null) return PRODUCTS

    return PRODUCTS.filter(({ category: productCategory }) => productCategory === category.key)
  }, [category])

  return (
    <Autocomplete
      // disablePortal
      onChange={onChange}
      value={value}
      autoHighlight
      options={options}
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
              bgcolor: CATEGORIES?.[option.category as CategoryKey]?.color,
              fontSize: (theme) => theme.typography.body2.fontSize,
              color: (theme) => theme.palette.primary.contrastText,
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
            autoComplete: 'new-password', // disable autocomplete and autofill,
          }}
        />
      )}
    />
  )
}

export default AddProduct
