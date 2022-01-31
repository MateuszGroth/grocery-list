import { useEffect, useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ButtonGroup from '@mui/material/ButtonGroup'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

import { CATEGORIES, UNIT } from 'constant'
import type { CategoryKey, Category, Unit, GroceryItem } from 'types'

const categoriesList = Object.values(CATEGORIES)

const StyledTextField = styled(TextField)(({ theme }) => ({}))

const DEFAULT_AMOUNT = 1
const DEFAULT_UNIT = UNIT.SZT
const DEFAULT_CATEGORY = CATEGORIES.random

type EditProductProps = {
  open: boolean
  editedItem: GroceryItem | null
  onCancel(): void
  onApply(editedItemData: Partial<GroceryItem>): void
}
const EditProduct = ({ open, editedItem, onCancel, onApply }: EditProductProps) => {
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT)
  const [unit, setUnit] = useState<Unit>(DEFAULT_UNIT)
  const [category, setCategory] = useState<Category | null>(DEFAULT_CATEGORY)

  useEffect(() => {
    if (editedItem == null) {
      return
    }

    setAmount(+editedItem.amount)
    setUnit(editedItem.unit)
    setCategory(CATEGORIES[editedItem.category as CategoryKey] || DEFAULT_CATEGORY)
  }, [editedItem])

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

  const handleClose = () => {
    onCancel()
  }
  const handleEditProduct = () => {
    onApply({
      amount,
      unit,
      category: category?.key as string,
    })
  }

  const isValid = !!amount && !!category
  const isTouched = amount !== editedItem?.amount || unit !== editedItem?.unit || category?.key !== editedItem?.category

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edytuj Produkt</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Zmień ilość, jednostkę lub kategorię produktu{' '}
          {editedItem?.product ? <strong>{editedItem?.product}</strong> : null}
        </DialogContentText>
        <Grid container columns={7} spacing={2} sx={{ pt: 2 }}>
          <Grid item xs={3} md={2} sx={{ display: 'flex', order: { xs: 0, md: 1 } }}>
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
          <Grid item xs={4} md={2} sx={{ order: { xs: 0, md: 1 } }}>
            <StyledTextField select fullWidth value={unit} onChange={handleUnitChange}>
              {Object.values(UNIT).map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </StyledTextField>
          </Grid>
          <Grid item xs={7} md={3} sx={{ order: { xs: 0, md: 1 } }}>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Zamknij</Button>
        <Button disabled={!isValid || !isTouched} onClick={handleEditProduct}>
          Potwierdź
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditProduct
