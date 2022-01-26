import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import AddCommentIcon from '@mui/icons-material/AddComment'
import Divider from '@mui/material/Divider'
import DeleteIcon from '@mui/icons-material/Delete'
import Collapse from '@mui/material/Collapse'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { TransitionGroup } from 'react-transition-group'

import { useAppDispatch } from 'hooks'
import { removeItem, editItem } from 'features'
import AddComment from '../AddComment/AddComment'
import Product from './Product/Product'

import type { GroceryItem } from 'types'

type ProductsProps = {
  items: GroceryItem[]
}

const ACTION = {
  DELETE: 'delete',
  COMMENT: 'comment',
}

const Products = ({ items }: ProductsProps) => {
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState<Array<string>>([])
  const [targettedItem, setTargettedItem] = useState<GroceryItem | null>()
  const [anchorEl, setAnchorEl] = useState(null)
  const [isAddingComment, setIsAddingComment] = useState(false)
  const open = Boolean(anchorEl)

  useEffect(() => {
    setSelected((prevSelected) => {
      return prevSelected.filter((id) => items.some((item) => item?.id === id))
    })
  }, [items])

  const handleSelect = (id: string) => {
    setSelected((prevSelected) => {
      const newSelectedSet = new Set([...prevSelected, id])
      return [...newSelectedSet]
    })
  }
  const handleUnselect = (id: string) => {
    setSelected((prevSelected) => {
      return prevSelected.filter((selId) => selId !== id)
    })
  }

  const handleClick = (id: string, isSelected: boolean) => {
    ;(isSelected ? handleUnselect : handleSelect)(id)
  }

  const handleMoreClick = (event: any, item: GroceryItem) => {
    setTargettedItem(item)
    setAnchorEl(event?.currentTarget)
  }

  const handleMoreClose = (action: any) => {
    switch (action) {
      case ACTION.DELETE: {
        dispatch(removeItem({ id: targettedItem?.id || '' }))
        setTargettedItem(null)
        break
      }
      case ACTION.COMMENT: {
        setIsAddingComment(true)
        break
      }
      default:
        break
    }
    setAnchorEl(null)
  }

  const handleAddCommentCancel = () => {
    setIsAddingComment(false)
  }

  const handleCommentApply = (comment: string) => {
    setIsAddingComment(false)
    console.log(comment)
    dispatch(
      editItem({
        id: targettedItem?.id as string,
        itemChanges: {
          comment,
        },
      }),
    )
  }

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ p: 2 }}>
        <Typography variant="h5">Twoje produkty</Typography>
        <Typography variant="body2" component="div" sx={{ display: 'inline' }} color={'textSecondary'}>
          Zaznaczono{' '}
          <Typography sx={{ display: 'inline' }} variant="body1" color={selected.length ? 'primary' : 'textSecondary'}>
            {selected.length}
          </Typography>
          /{items.length}
        </Typography>
      </Stack>
      <Divider></Divider>
      <List sx={{ width: '100%', height: '100%', overflow: 'auto' }} disablePadding>
        <TransitionGroup>
          {items.map((item) => {
            const isSelected =
              item?.id != null && (selected.includes(item?.id as string) || targettedItem?.id === item?.id)

            return (
              <Collapse key={item.id}>
                <Product
                  isSelected={isSelected}
                  onProductClick={handleClick}
                  item={item}
                  onMoreClick={handleMoreClick}
                />
              </Collapse>
            )
          })}
          {!items.length && (
            <Collapse key={'no-items'}>
              <Box
                display="flex"
                alignItems={'center'}
                sx={{ color: 'text.secondary', gap: 1, pt: 2, pb: { xs: 2, md: 3 }, pl: 2 }}
              >
                <ProductionQuantityLimitsIcon color="inherit" fontSize="large" />
                <Typography variant="h6">Nie masz zadnych produktów</Typography>
              </Box>
            </Collapse>
          )}
        </TransitionGroup>
      </List>
      <Menu
        id="product-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMoreClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleMoreClose(ACTION.COMMENT)}>
          <ListItemIcon>
            <AddCommentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Skomentuj</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMoreClose(ACTION.DELETE)}>
          <ListItemIcon>
            <DeleteIcon sx={{ color: 'coral' }} fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'coral' }}>Usuń</ListItemText>
        </MenuItem>
      </Menu>
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
