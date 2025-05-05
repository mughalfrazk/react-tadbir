import { CssBaseline, ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'

import { tadbirTheme } from '../tadbir-theme'

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={tadbirTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default AppProvider
