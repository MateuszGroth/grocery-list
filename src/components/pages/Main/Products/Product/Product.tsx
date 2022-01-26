import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Tooltip from '@mui/material/Tooltip'

import { CATEGORIES } from 'constant'

import type { CategoryKey, GroceryItem } from 'types'

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
                      Komentarz -
                      <Tooltip placement="top" title={item?.comment || ''}>
                        <span>{item?.comment}</span>
                      </Tooltip>
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

export default Product
