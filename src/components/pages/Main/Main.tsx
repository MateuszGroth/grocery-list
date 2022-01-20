import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import AddProduct from './AddProduct/AddProduct'

import { useAppSelector } from 'hooks'
import { selectGroceryItems } from 'features'

// todo u gory lista od razu - ikona z cyferka jako list item icon, nazwa produktu i labelka kolorowa jako tag

const MainPage = () => {
  const products = useAppSelector(selectGroceryItems)
  return (
    <Container sx={{ height: '100%', py: { sx: 2, md: 5 } }}>
      <Stack sx={{ height: '100%' }} spacing={{ xs: 2, md: 2 }}>
        <Typography sx={{ textAlign: 'center' }} variant="h4" component="h1" gutterBottom>
          Utwórz listę zakupów
        </Typography>
        <Paper
          elevation={5}
          sx={{ p: { sx: 2, md: 4 }, flexGrow: 1, overflow: 'auto', borderRadius: { xs: 3, md: 4 } }}
        >
          <Grid container columns={12} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Twoje produkty:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AddProduct />
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </Container>
  )
}

export default MainPage
