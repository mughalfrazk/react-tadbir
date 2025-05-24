import { createTheme } from '@mui/material'

import LatoBlack from '@/assets/fonts/Lato/Lato-Black.ttf'
import LatoBlackItalic from '@/assets/fonts/Lato/Lato-BlackItalic.ttf'
import LatoBold from '@/assets/fonts/Lato/Lato-Bold.ttf'
import LatoBoldItalic from '@/assets/fonts/Lato/Lato-BoldItalic.ttf'
import LatoItalic from '@/assets/fonts/Lato/Lato-Italic.ttf'
import LatoLight from '@/assets/fonts/Lato/Lato-Light.ttf'
import LatoLightItalic from '@/assets/fonts/Lato/Lato-LightItalic.ttf'
import LatoRegular from '@/assets/fonts/Lato/Lato-Regular.ttf'
import LatoThin from '@/assets/fonts/Lato/Lato-Thin.ttf'
import LatoThinItalic from '@/assets/fonts/Lato/Lato-ThinItalic.ttf'

export const tadbirTheme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      black: '#000',
      white: '#fff'
    },
    primary: {
      main: '#e87223', // '#CB6040',
      light: '#FD8B51',
      dark: '#CB6040',
      contrastText: '#fff'
    },
    secondary: {
      main: '#257180',
      light: '#257180',
      dark: '#257180',
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: "'Lato', Calibri",
    fontSize: 14,
    h1: {
      fontSize: '2rem',
      fontWeight: 900,
      lineHeight: '2.2rem'
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 900,
      lineHeight: '2rem'
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 900,
      lineHeight: '1.5rem'
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: '1.25rem'
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: '1rem'
    },
    h6: {
      fontSize: '0.9rem',
      fontWeight: 700,
      lineHeight: '0.8rem'
    },
    subtitle1: {
      fontSize: '0.75rem',
      fontWeight: 'bold',
      lineHeight: '1.5rem'
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 'normal',
      lineHeight: '1.25rem'
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.5rem'
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.25rem'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Lato';
          font-weight: 900;
          src: local('Lato'), local('Lato-Black'), url(${LatoBlack}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Lato';
          font-weight: 900;
          font-style: italic;
          src: local('Lato'), local('Lato-BlackItalic'), url(${LatoBlackItalic}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Lato';
          font-weight: 700;
          src: local('Lato'), local('Lato-Bold'), url(${LatoBold}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 700;
          src: local('Lato'), local('Lato-BoldItalic'), url(${LatoBoldItalic}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Lato';
          font-weight: 400;
          src: local('Lato'), local('Lato-Regular'), url(${LatoRegular}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 400;
          src: local('Lato'), local('Lato-Italic'), url(${LatoItalic}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Lato';
          font-weight: 300;
          src: local('Lato'), local('Lato-Light'), url(${LatoLight}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 300;
          src: local('Lato'), local('Lato-LightItalic'), url(${LatoLightItalic}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Lato';
          font-weight: 100;
          src: local('Lato'), local('Lato-Thin'), url(${LatoThin}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 100;
          src: local('Lato'), local('Lato-ThinItalic'), url(${LatoThinItalic}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // borderRadius: '0.7rem',
          textTransform: 'none',
          paddingLeft: '15px !important',
          paddingRight: '15px !important'
        }
      }
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
