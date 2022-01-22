import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import darkScrollbar from '@mui/material/darkScrollbar'

const lightPalette = {
  primary: {
    main: '#6c4233',
  },
  secondary: {
    main: '#3A9E52',
  },
  background: {
    default: '#fff2eb',
  },
}

const darkPalette = {
  secondary: {
    main: '#3A9E52',
    dark: '#154720',
    light: '#678d6f',
  },
}

let theme = createTheme({
  palette: {
    mode: 'dark',
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
  palette: {
    ...theme.palette,
    ...(theme.palette.mode === 'dark' ? darkPalette : lightPalette),
  },
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

export { theme, lightPalette, darkPalette }

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
