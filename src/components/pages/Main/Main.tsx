import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
// import type { Theme } from '@mui/material/styles'

import Products from './Products/Products'

import { DialogProvider } from 'utils'
import { useAppSelector } from 'hooks'
import { selectGroceryItems } from 'features'
import { store } from 'store'

const MainPage = () => {
  const products = useAppSelector(selectGroceryItems)

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
    <DialogProvider>
      <Container sx={{ height: '100%', py: { xs: 3, md: 5 } }} maxWidth="md">
        <Stack sx={{ height: '100%' }} spacing={{ xs: 2, md: 2 }} alignItems={'center'}>
          <Paper elevation={8} sx={{ width: '100%', flexGrow: 1, overflow: 'auto', borderRadius: { xs: 1, md: 2 } }}>
            <Stack direction={'column'} sx={{ height: '100%' }}>
              <Products items={products} />
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </DialogProvider>
  )
}

export default MainPage
