import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FormControlLabel from '@mui/material/FormControlLabel'
import SaveIcon from '@mui/icons-material/Save'
import Switch from '@mui/material/Switch'
import Zoom from '@mui/material/Zoom'

import { useDialog } from 'utils'
import { useAppDispatch, useAppSelector } from 'hooks'
import {
  removeItem,
  editItem,
  removeAll,
  removeItems,
  selectIsGrouping,
  setIsGrouping,
  selectIsEdited,
  setIsEdited,
  selectGroceryItems,
} from 'features'
import { PRODUCT_ACTION } from 'constant'

import AddComment from '../AddComment/AddComment'
import EditProduct from '../EditProduct/EditProduct'
import { ProductList, GroupedProductList } from './ProductList'
import AddProduct from '../AddProduct/AddProduct'

import { AllMenu, ProductMenu } from './Menu'

import type { GroceryItem } from 'types'

type ProductsProps = {
  onSave(): void
}

// todo w all menu dodac ustawioenia, a tam w dialogu grupowanie po kategoriach

const Products = ({ onSave }: ProductsProps) => {
  const { showCustomDialog } = useDialog()

  const dispatch = useAppDispatch()
  const items = useAppSelector(selectGroceryItems)
  const isGrouping = useAppSelector(selectIsGrouping)
  const isEdited = useAppSelector(selectIsEdited)

  const [selected, setSelected] = useState<Array<string>>([])
  const [targettedItem, setTargettedItem] = useState<GroceryItem | null>()
  const [productAnchorEl, setProductAnchorEl] = useState(null)
  const [allAnchorEl, setAllAnchorEl] = useState(null)
  const [isAddingComment, setIsAddingComment] = useState(false)
  const [isEditingProduct, setIsEditingProduct] = useState(false)

  useEffect(() => {
    setSelected((prevSelected) => {
      return prevSelected.filter((id) => items.some((item) => item?.id === id))
    })
    setTargettedItem(null)
  }, [items])

  const handleSelect = (id: string) => {
    setSelected((prevSelected) => {
      return [...prevSelected, id]
    })
  }
  const handleUnselect = (id: string) => {
    setSelected((prevSelected) => {
      return prevSelected.filter((selId) => selId !== id)
    })
  }

  const handleProductClick = (id: string) => {
    const callback = selected.includes(id) ? handleUnselect : handleSelect
    callback(id)
  }

  const handleMoreClick = (event: any, item: GroceryItem) => {
    setTargettedItem(item)
    setProductAnchorEl(event?.currentTarget)
  }

  const handleAllMoreClick = (event: any) => {
    setAllAnchorEl(event?.currentTarget)
  }

  const handleMenuClose = (action: any) => {
    switch (action) {
      case PRODUCT_ACTION.DELETE: {
        dispatch(removeItem({ id: targettedItem?.id || '' }))
        setTargettedItem(null)
        break
      }
      case PRODUCT_ACTION.COMMENT: {
        setIsAddingComment(true)
        break
      }
      case PRODUCT_ACTION.EDIT: {
        setIsEditingProduct(true)
        break
      }
      default: {
        setTargettedItem(null)
        break
      }
    }

    setProductAnchorEl(null)
  }

  const handleAllMenuClose = (action: any) => {
    switch (action) {
      case PRODUCT_ACTION.DELETE_ALL: {
        showCustomDialog({
          title: 'Potwierdź Usunięcie Produktów',
          content: `Czy na pewno chcesz usunąć wszystkie produkty z listy?`,
          onApply: () => {
            dispatch(removeAll())
          },
          applyActionLabel: 'Usuń',
        })

        break
      }
      case PRODUCT_ACTION.DELETE_SELECTED: {
        showCustomDialog({
          title: 'Potwierdź Usunięcie Produktów',
          content: `Czy na pewno chcesz usunąć wszystkie zaznaczone produkty z listy?`,
          onApply: () => {
            dispatch(removeItems({ idList: selected }))
          },
          applyActionLabel: 'Usuń',
        })

        break
      }
      default:
        break
    }
    setAllAnchorEl(null)
  }

  const handleAddCommentCancel = () => {
    setTargettedItem(null)
    setIsAddingComment(false)
  }

  const handleCommentApply = (comment: string) => {
    setIsAddingComment(false)
    dispatch(
      editItem({
        id: targettedItem?.id as string,
        itemChanges: {
          comment,
        },
      }),
    )
    setTargettedItem(null)
  }

  const handleEditProductCancel = () => {
    setTargettedItem(null)
    setIsEditingProduct(false)
  }

  const handleEditProductApply = (editedItemData: Partial<GroceryItem>) => {
    setIsEditingProduct(false)
    dispatch(
      editItem({
        id: targettedItem?.id as string,
        itemChanges: { ...editedItemData },
      }),
    )
    setTargettedItem(null)
  }

  const handleSave = () => {
    dispatch(setIsEdited(false))
    onSave()
  }

  return (
    <>
      <AddProduct />
      <Stack direction="row" justifyContent="space-between" alignItems={'center'} sx={{ minHeight: '4rem', px: 2 }}>
        <Box display="flex" alignItems={'center'}>
          <Typography variant="h6">Twoje Produkty</Typography>
          <Zoom
            in={isEdited}
            timeout={{ exit: 500, enter: 300 }}
            style={{ transitionDelay: !isEdited ? '200ms' : '0ms' }}
          >
            <IconButton sx={{ p: 1, ml: 1 }} disabled={!isEdited} aria-label="save" title="save" onClick={handleSave}>
              <SaveIcon />
            </IconButton>
          </Zoom>
        </Box>
        <IconButton
          edge="end"
          sx={{ p: 1 }}
          disabled={!items.length}
          aria-label="more"
          title="more"
          onClick={(ev) => handleAllMoreClick(ev)}
        >
          <MoreHorizIcon />
        </IconButton>
      </Stack>
      {isGrouping ? (
        <GroupedProductList
          items={items}
          selected={selected}
          handleMoreClick={handleMoreClick}
          handleProductClick={handleProductClick}
          targettedItem={targettedItem}
        />
      ) : (
        <ProductList
          items={items}
          selected={selected}
          handleMoreClick={handleMoreClick}
          handleProductClick={handleProductClick}
          targettedItem={targettedItem}
        />
      )}

      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} sx={{ p: 2 }}>
        <FormControlLabel
          onChange={() => {
            dispatch(setIsGrouping(!isGrouping))
          }}
          checked={isGrouping}
          control={<Switch />}
          label="Grupowanie"
        />
        <Typography variant="body2" component="div" color={'textSecondary'}>
          Zaznaczono{' '}
          <Typography sx={{ display: 'inline' }} variant="body1" color={selected.length ? 'primary' : 'textSecondary'}>
            {selected.length}
          </Typography>
          /{items.length}
        </Typography>
      </Box>
      <ProductMenu onClose={handleMenuClose} open={Boolean(productAnchorEl)} anchorEl={productAnchorEl} />
      <AllMenu
        onClose={handleAllMenuClose}
        open={Boolean(allAnchorEl)}
        anchorEl={allAnchorEl}
        hasSelected={!!selected.length}
      />
      <AddComment
        open={isAddingComment}
        onCancel={handleAddCommentCancel}
        onApply={handleCommentApply}
        currentComment={targettedItem?.comment || ''}
      />
      <EditProduct
        open={isEditingProduct}
        onCancel={handleEditProductCancel}
        onApply={handleEditProductApply}
        editedItem={targettedItem as GroceryItem}
      />
    </>
  )
}

export default Products
