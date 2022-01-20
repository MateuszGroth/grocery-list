import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import darkScrollbar from '@mui/material/darkScrollbar'

let theme = createTheme({
  palette: {
    // mode: 'dark',
    // type: 'light',
    primary: {
      main: '#6c4233',
    },
    secondary: {
      main: '#3A9E52',
    },
    background: {
      default: '#fff2eb',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...(theme.palette.mode === 'dark' ? darkScrollbar() : {}),
        },
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
