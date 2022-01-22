import { useEffect } from 'react'
// import useMediaQuery from '@mui/material/useMediaQuery'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
// import type { Theme } from '@mui/material/styles'

import AddProduct from './AddProduct/AddProduct'
import Products from './Products/Products'

import { useAppSelector, useAppDispatch } from 'hooks'
import { selectGroceryItems, addItem } from 'features'
import { store } from 'store'

import type { GroceryItem } from 'types'

const MainPage = () => {
  // const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const products = useAppSelector(selectGroceryItems)
  const dispatch = useAppDispatch()
  const handleAddProduct = (productData: GroceryItem) => {
    dispatch(addItem(productData))
  }

  useEffect(() => {
    window.addEventListener('unload', () => {
      const groceryState = store.getState()?.grocery
      if (!groceryState) {
        return
      }
      localStorage.setItem('grocery', JSON.stringify(groceryState))
    })
  }, [])

  return (
    <Container sx={{ height: '100%', py: { sx: 2, md: 5 } }} maxWidth="md">
      <Stack sx={{ height: '100%' }} spacing={{ xs: 2, md: 2 }} alignItems={'center'}>
        <Typography color="primary" sx={{ textAlign: 'center' }} variant="h5" component="h1" gutterBottom>
          Utwórz listę zakupów
        </Typography>
        <Paper elevation={8} sx={{ width: '100%', flexGrow: 1, overflow: 'auto', borderRadius: { xs: 1, md: 2 } }}>
          <Stack direction={'column'} sx={{ height: '100%' }}>
            <Products items={products} />
            <AddProduct onAdd={handleAddProduct} />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}

export default MainPage
