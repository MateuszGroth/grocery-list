import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import darkScrollbar from '@mui/material/darkScrollbar'

let theme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: '#0052cc',
    },
    // secondary: {
    //   main: '#edf2ff',
    // },
  },
})

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: theme.palette.mode === 'dark' ? darkScrollbar() : null,
      },
    },
  },
})

type TProps = {
  children: any
}

const ThemeProvider = ({ children }: TProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
