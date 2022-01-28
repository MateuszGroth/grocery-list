import { FunctionComponent, useMemo } from 'react'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import { CATEGORIES, UNIT } from 'constant'

import type { CategoryKey, GroceryItem } from 'types'

type ProductProps = {
  item: GroceryItem
  isSelected: boolean
  onProductClick(id?: string): void
  onMoreClick(event?: any, item?: GroceryItem): void
}
const Product = ({ item, isSelected, onProductClick, onMoreClick }: ProductProps) => {
  const handleProductClick = () => {
    if (!item?.id) {
      return
    }

    onProductClick(item?.id as string)
  }
  const Icon = useMemo<FunctionComponent<any> | undefined>(
    () => CATEGORIES?.[item.category as CategoryKey]?.Icon,
    [item],
  )
  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton edge="end" aria-label="more" title="more" onClick={(ev) => onMoreClick(ev, item)}>
            <MoreHorizIcon />
          </IconButton>
        }
        alignItems={item?.comment ? 'flex-start' : 'center'}
      >
        <ListItemButton onClick={handleProductClick} selected={isSelected}>
          <ListItemAvatar>
            <Avatar
              sx={{
                bgcolor: (theme) => {
                  const color: string = CATEGORIES?.[item.category as CategoryKey]?.getColor(theme.palette.mode)

                  return color || 'secondary.main'
                },
                color: (theme) =>
                  CATEGORIES?.[item.category as CategoryKey]?.getIconColor(theme.palette.mode) || 'text.primary',
              }}
            >
              {Icon ? <Icon /> : item.amount}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{ pr: 2 }}
            primary={
              <>
                <Typography sx={{ display: 'inline' }} component="span" color="textPrimary">
                  {item.amount} {item.unit !== UNIT.SZT && item.unit} <strong>{item.product}</strong>
                </Typography>
              </>
            }
            secondary={
              item?.comment ? (
                <>
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                    Komentarz{' '}
                  </Typography>
                  - {item?.comment}
                </>
              ) : undefined
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  )
}

export default Product
