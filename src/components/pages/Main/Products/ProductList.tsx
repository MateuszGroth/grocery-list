import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import { TransitionGroup } from 'react-transition-group'

import Product from './Product/Product'
import { CATEGORIES } from 'constant'

import type { GroceryItem } from 'types'

type ProductsProps = {
  items: GroceryItem[]
  selected: string[]
  targettedItem?: GroceryItem | null
  handleProductClick: any
  handleMoreClick: any
}

export const ProductList = ({ items, selected, targettedItem, handleProductClick, handleMoreClick }: ProductsProps) => {
  return (
    <>
      <Divider />
      <List sx={{ width: '100%', height: '100%', overflow: 'auto', position: 'relative' }} disablePadding>
        <TransitionGroup>
          {items.map((item) => {
            const isSelected =
              item?.id != null && (selected.includes(item?.id as string) || targettedItem?.id === item?.id)

            return (
              <Collapse key={item.id}>
                <Product
                  isSelected={isSelected}
                  onProductClick={handleProductClick}
                  item={item}
                  onMoreClick={handleMoreClick}
                />
              </Collapse>
            )
          })}
        </TransitionGroup>
        {!items.length && (
          <Box
            display="flex"
            alignItems={'center'}
            sx={{ color: 'text.secondary', gap: 1, pt: 2, pb: { xs: 2, md: 3 }, pl: 2 }}
          >
            <ProductionQuantityLimitsIcon color="inherit" />
            <Typography variant="body1">Nie masz zadnych produktów</Typography>
          </Box>
        )}
      </List>
      <Divider />
    </>
  )
}

export const GroupedProductList = ({
  items,
  selected,
  targettedItem,
  handleProductClick,
  handleMoreClick,
}: ProductsProps) => {
  const groupedItems = useMemo(() => {
    const categories = Object.values(CATEGORIES)
    return categories
      .map((category) => {
        const categoryGroup = {
          ...category,
          items: items.filter((item) => item.category === category.key),
        }
        return categoryGroup
      })
      .filter((categoryGroup) => categoryGroup.items.length)
      .sort((a, b) => b.items.length - a.items.length)
  }, [items])

  return (
    <>
      <Divider />
      <List sx={{ width: '100%', height: '100%', overflow: 'auto', position: 'relative' }} disablePadding>
        {groupedItems.map((categoryGroup) => {
          return (
            <li key={categoryGroup.key}>
              <ul>
                <TransitionGroup>
                  <Collapse>
                    <ListSubheader
                      sx={{
                        bgcolor: (theme) => categoryGroup.getColor(theme.palette.mode),
                        color: (theme) => categoryGroup.getIconColor(theme.palette.mode),
                        py: 1,
                        my: 1,
                      }}
                    >
                      <Typography variant="subtitle1"> {categoryGroup.label}</Typography>
                    </ListSubheader>
                  </Collapse>
                  {categoryGroup.items.map((item) => {
                    const isSelected =
                      item?.id != null && (selected.includes(item?.id as string) || targettedItem?.id === item?.id)
                    return (
                      <Collapse key={item.id}>
                        <Product
                          isSelected={isSelected}
                          onProductClick={handleProductClick}
                          item={item}
                          onMoreClick={handleMoreClick}
                        />
                      </Collapse>
                    )
                  })}
                </TransitionGroup>
              </ul>
            </li>
          )
        })}
        {!items.length && (
          <Box
            display="flex"
            alignItems={'center'}
            sx={{ color: 'text.secondary', gap: 1, pt: 2, pb: { xs: 2, md: 3 }, pl: 2 }}
          >
            <ProductionQuantityLimitsIcon color="inherit" />
            <Typography variant="body1">Nie masz zadnych produktów</Typography>
          </Box>
        )}
      </List>
      <Divider />
    </>
  )
}
