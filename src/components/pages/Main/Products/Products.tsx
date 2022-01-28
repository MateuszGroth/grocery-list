import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

import { useDialog } from 'utils'
import { useAppDispatch, useAppSelector } from 'hooks'
import { removeItem, editItem, removeAll, removeItems, selectIsGrouping, setIsGrouping } from 'features'
import { PRODUCT_ACTION } from 'constant'

import AddComment from '../AddComment/AddComment'
import { ProductList, GroupedProductList } from './ProductList'
import AddProduct from '../AddProduct/AddProduct'

import { AllMenu, ProductMenu } from './Menu'

import type { GroceryItem } from 'types'

type ProductsProps = {
  items: GroceryItem[]
}

// todo w all menu dodac ustawioenia, a tam w dialogu grupowanie po kategoriach

const Products = ({ items }: ProductsProps) => {
  const { showCustomDialog } = useDialog()
  const dispatch = useAppDispatch()
  const isGrouping = useAppSelector(selectIsGrouping)
  const [selected, setSelected] = useState<Array<string>>([])
  const [targettedItem, setTargettedItem] = useState<GroceryItem | null>()
  const [productAnchorEl, setProductAnchorEl] = useState(null)
  const [allAnchorEl, setAllAnchorEl] = useState(null)
  const [isAddingComment, setIsAddingComment] = useState(false)

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
      default:
        break
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

  return (
    <>
      <AddProduct />
      <Stack direction="row" justifyContent="space-between" alignItems={'center'} sx={{ minHeight: '4rem', px: 2 }}>
        <Typography variant="h6">Twoje Produkty</Typography>
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
    </>
  )
}

export default Products
