import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Collapse from '@mui/material/Collapse'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { TransitionGroup } from 'react-transition-group'

import { CATEGORIES } from 'constant'
import { useAppDispatch } from 'hooks'
import { removeItem } from 'features'

import type { CategoryKey, GroceryItem } from 'types'

type ProductsProps = {
  items: GroceryItem[]
}

const Products = ({ items }: ProductsProps) => {
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState<Array<string>>([])
  const [targettedItem, setTargettedItem] = useState<GroceryItem | null>()
  const [anchorEl, setAnchorEl] = useState(null)
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
    if (action === 'delete' && targettedItem?.id) {
      dispatch(removeItem({ id: targettedItem?.id as string }))
    }
    setTargettedItem(null)
    setAnchorEl(null)
  }

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ p: 2 }}>
        <Typography variant="h5">Twoje produkty</Typography>
        <Typography variant="body2" color={'textSecondary'}>
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
          {!items.length && (
            <Box
              display="flex"
              alignItems={'center'}
              sx={{ color: 'text.secondary', gap: 1, pt: 2, pb: { xs: 2, md: 3 } }}
            >
              <ProductionQuantityLimitsIcon color="inherit" fontSize="large" />
              <Typography variant="h6">Nie masz zadnych produktów</Typography>
            </Box>
          )}

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
        <MenuItem onClick={handleMoreClose}>Profile</MenuItem>
        <MenuItem onClick={handleMoreClose}>My account</MenuItem>
        <MenuItem onClick={() => handleMoreClose('delete')}>
          <ListItemIcon>
            <DeleteIcon sx={{ color: 'coral' }} fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'coral' }}>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

type ProductProps = {
  item: GroceryItem
  isSelected: boolean
  onProductClick(id?: string, isSelected?: boolean): void
  onMoreClick(event?: any, item?: GroceryItem): void
}
const Product = ({ item, isSelected, onProductClick, onMoreClick }: ProductProps) => {
  const handleProductClick = (item: GroceryItem) => {
    if (!item?.id) {
      return
    }

    onProductClick(item?.id as string, isSelected)
  }
  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton edge="end" aria-label="more" title="more" onClick={(ev) => onMoreClick(ev, item)}>
            <MoreHorizIcon />
          </IconButton>
        }
      >
        <ListItemButton onClick={() => handleProductClick(item)} selected={isSelected}>
          <ListItemAvatar>
            <Avatar
              sx={{
                bgcolor: (theme) => {
                  const color: string =
                    theme.palette.mode === 'dark'
                      ? CATEGORIES?.[item.category as CategoryKey]?.darkModeColor
                      : CATEGORIES?.[item.category as CategoryKey]?.color

                  return color || 'secondary.main'
                },
              }}
            >
              {item.amount}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography sx={{ display: 'inline' }} component="span" color="textPrimary">
                  {item.product}
                </Typography>
                {item?.comment ? (
                  <>
                    <Box sx={{ color: 'text.secondary', ml: '10px', mr: '15px' }} className="dot"></Box>
                    <Typography sx={{ display: 'inline' }} component="span" variant="body1" color="textSecondary">
                      Komentarz - {item?.comment}
                    </Typography>
                  </>
                ) : null}
              </>
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  )
}

export default Products
