import Grid from '@mui/material/Grid'

type MainContainerProps = {
  children: any
}

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <Grid
      container
      sx={(theme) => ({
        paddingInline: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
          paddingInline: theme.spacing(2),
        },
      })}
    >
      {children}
    </Grid>
  )
}

export default MainContainer
