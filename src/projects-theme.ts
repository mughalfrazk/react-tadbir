import { createTheme } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

export const projectsTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme'
  },
  palette: {
    mode: 'light',
    common: {
      black: '#000',
      white: '#fff'
    },
    primary: {
      main: '#CB6040',
      light: '#FD8B51',
      dark: '#CB6040',
      contrastText: '#fff'
    },
    secondary: {
      main: '#257180',
      light: '#257180',
      dark: '#257180',
      contrastText: '#fff'
    },
    grey: {
      50: blueGrey[50],
      100: blueGrey[100],
      200: blueGrey[200],
      300: blueGrey[300],
      400: blueGrey[400],
      500: blueGrey[500],
      600: blueGrey[600],
      700: blueGrey[700],
      800: blueGrey[800],
      900: blueGrey[900]
    }
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536
    }
  }
})
