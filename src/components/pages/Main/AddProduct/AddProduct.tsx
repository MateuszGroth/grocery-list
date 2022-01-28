import { useMemo, useState } from 'react'
import { styled } from '@mui/material/styles'
// import useMediaQuery from '@mui/material/useMediaQuery'
import Collapse from '@mui/material/Collapse'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ButtonGroup from '@mui/material/ButtonGroup'
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

import { useAppDispatch } from 'hooks'
import { addItem } from 'features'
import { PRODUCTS, CATEGORIES, UNIT } from 'constant'
import type { CategoryKey, Product, Category, Unit } from 'types'
import { IconButton } from '@mui/material'

const categoriesList = Object.values(CATEGORIES)

const StyledTextField = styled(TextField)(({ theme }) => ({}))

const DEFAULT_AMOUNT = 1
const DEFAULT_UNIT = UNIT.SZT
const DEFAULT_CATEGORY = CATEGORIES.random

const AddProduct = () => {
  // const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const dispatch = useAppDispatch()
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT)
  const [unit, setUnit] = useState<Unit>(DEFAULT_UNIT)
  const [product, setProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<Category | null>(DEFAULT_CATEGORY)
  const [customProduct, setCustomProduct] = useState('')
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleAddAmount = () => {
    setAmount((prev) => +prev + 1)
  }

  const handleDecreaseAmount = () => {
    setAmount((prev) => {
      const newValue = +prev - 1
      if (newValue < 0) {
        return 0
      }
      return newValue
    })
  }

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
    if (newValue !== '' && isNaN(newValue)) {
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
    setCustomProduct('')
  }

  const handleAdd = () => {
    dispatch(
      addItem({
        amount,
        unit,
        product: product?.label || (customProduct as string),
        category: category?.key as string,
      }),
    )
    handleReset()
  }

  const handleInputChange = (newValue: string) => {
    setProduct(null)
    setCustomProduct(newValue)
  }

  const isValid = !!amount && (!!product || customProduct) && !!category
  const isTouched =
    !!product || !!customProduct || amount !== DEFAULT_AMOUNT || unit !== DEFAULT_UNIT || category !== DEFAULT_CATEGORY

  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 2,
      }}
      elevation={1}
      component={Paper}
    >
      <Collapse in={!isCollapsed}>
        <Grid container columns={7} spacing={1} sx={{ pb: 2 }}>
          <Grid item xs={2} md={1} sx={{ display: 'flex', order: { xs: 0, md: 1 } }}>
            <ButtonGroup
              sx={{ border: (theme) => `1px solid ${theme.palette.grey[700]}` }}
              orientation="vertical"
              variant="text"
              aria-label="vertical  button group"
            >
              <Button
                size="small"
                key="increase"
                onClick={handleAddAmount}
                sx={{
                  color: 'text.secondary',
                  pt: '3px',
                  pb: '2px',
                  borderBottomColor: (theme) => `${theme.palette.grey[700]} !important`,
                }}
              >
                <AddIcon color="inherit" fontSize="small" />
              </Button>
              <Button
                onClick={handleDecreaseAmount}
                size="small"
                key="decrease"
                sx={{ color: 'text.secondary', pb: '3px', pt: '3px' }}
              >
                <RemoveIcon color="inherit" fontSize="small" />
              </Button>
            </ButtonGroup>
            <StyledTextField type="text" fullWidth value={amount} onChange={handleAmountChange} />
          </Grid>
          <Grid item xs={2} md={1} sx={{ order: { xs: 0, md: 1 } }}>
            <StyledTextField select fullWidth value={unit} onChange={handleUnitChange}>
              {Object.values(UNIT).map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </StyledTextField>
          </Grid>
          <Grid item xs={7} md={3} sx={{ order: { xs: 1, md: 1 } }}>
            <ProductsSelect
              inputValue={customProduct}
              onInputChange={handleInputChange}
              value={product}
              onChange={handleProductChange}
              category={category}
            />
          </Grid>
          <Grid item xs={3} md={2} sx={{ order: { xs: 0, md: 1 } }}>
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
                      bgcolor: (theme) => cat?.getColor(theme.palette.mode) || 'primary.main',
                      fontSize: (theme) => theme.typography.body2.fontSize,
                      color: (theme) => cat?.getIconColor(theme.palette.mode) || 'primary.contrastText',
                    }}
                    label={cat.label}
                  />
                </MenuItem>
              ))}
            </StyledTextField>
          </Grid>
        </Grid>
      </Collapse>
      <Stack spacing={3} direction={'row'}>
        <Button disabled={!isValid} onClick={handleAdd} variant="contained">
          Dodaj
        </Button>
        <Button disabled={!isTouched} onClick={handleReset}>
          Zresetuj
        </Button>
        <Box flex={1} textAlign={'end'}>
          <IconButton sx={{ alignSelf: 'end' }} onClick={() => setIsCollapsed((prev) => !prev)}>
            {isCollapsed ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </IconButton>
        </Box>
      </Stack>
    </Box>
  )
}

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

export default AddProduct
