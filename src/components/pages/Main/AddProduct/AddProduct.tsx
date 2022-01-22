import { useMemo, useState } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import ListItemButton from '@mui/material/ListItemButton'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

import { PRODUCTS, CATEGORIES, UNIT } from 'constant'
import type { CategoryKey, Product, Category, Unit, GroceryItem } from 'types'

const categoriesList = Object.values(CATEGORIES)

const StyledTextField = styled(TextField)(({ theme }) => ({}))

type AddProductProps = {
  onAdd(productData: GroceryItem): void
}
const DEFAULT_AMOUNT = 1
const DEFAULT_UNIT = UNIT.SZT
const DEFAULT_CATEGORY = CATEGORIES.random

const AddProduct = ({ onAdd }: AddProductProps) => {
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT)
  const [unit, setUnit] = useState<Unit>(DEFAULT_UNIT)
  const [product, setProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<Category | null>(DEFAULT_CATEGORY)

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

  const handleAmountChange = (event: any) => {
    const newValue = event?.target?.value
    if (newValue !== '' && +newValue <= 0) {
      return
    }

    setAmount(newValue)
  }

  const handleUnitChange = (event: any) => {
    setUnit(event.target.value)
  }

  const handleReset = () => {
    setAmount(DEFAULT_AMOUNT)
    setUnit(DEFAULT_UNIT)
    setProduct(null)
    setCategory(CATEGORIES.random)
  }

  const handleAdd = () => {
    onAdd({
      amount,
      unit,
      product: product?.label as string,
      category: category?.key as string,
    })
    handleReset()
  }

  const isValid = !!amount && !!product && !!category
  const isTouched = !!product || amount !== DEFAULT_AMOUNT || unit !== DEFAULT_UNIT || category !== DEFAULT_CATEGORY

  return (
    <Box
      sx={{
        borderRadius: 2,
      }}
      elevation={1}
      component={Paper}
    >
      <Grid container columns={7} spacing={1} sx={{ p: 2 }}>
        <Grid item xs={1}>
          <StyledTextField label="Ilość" type="number" fullWidth value={amount} onChange={handleAmountChange} />
        </Grid>
        <Grid item xs={1}>
          <StyledTextField select fullWidth value={unit} onChange={handleUnitChange}>
            {Object.values(UNIT).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </StyledTextField>
        </Grid>
        <Grid item xs={3}>
          <ProductsSelect value={product} onChange={handleProductChange} category={category} />
        </Grid>
        <Grid item xs={2}>
          <StyledTextField
            select
            fullWidth
            InputLabelProps={{ shrink: !!category }}
            label="Kategoria"
            value={category?.key || ''}
            onChange={handleCategoryChange}
            sx={{
              '& .MuiInputBase-input': {
                py: '12px',
              },
            }}
          >
            {categoriesList.map((cat) => (
              <MenuItem key={cat.label} value={cat.key}>
                <Chip
                  sx={{
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? cat?.darkModeColor : cat?.color),
                    fontSize: (theme) => theme.typography.body2.fontSize,
                    color: (theme) => theme.palette.primary.contrastText,
                  }}
                  label={cat.label}
                />
              </MenuItem>
            ))}
          </StyledTextField>
        </Grid>
        <Grid item xs={12}>
          <Stack
            spacing={3}
            direction={'row'}
            sx={{
              pt: 2,
            }}
          >
            <Button disabled={!isValid} onClick={handleAdd} variant="contained">
              Dodaj
            </Button>
            <Button disabled={!isTouched} onClick={handleReset}>
              Zresetuj
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

type ProductsSelectProps = { value: Product | null; onChange(ev: any, value: any): any; category: Category | null }
const ProductsSelect = ({ value, onChange, category }: ProductsSelectProps) => {
  const options = useMemo(() => {
    return PRODUCTS
    // if (category == null) return PRODUCTS

    // return PRODUCTS.filter(({ category: productCategory }) => productCategory === category.key)
  }, [])
  // }, [category])

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
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? CATEGORIES?.[option.category as CategoryKey]?.darkModeColor
                  : CATEGORIES?.[option.category as CategoryKey]?.color,
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
