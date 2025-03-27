import { ReactNode } from 'react'
import { AppProvider as MuiAppProvider, DashboardLayout, Navigation } from '@toolpad/core'
import { CssBaseline, ThemeProvider } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TimelineIcon from '@mui/icons-material/Timeline'
import { useDemoRouter } from '@toolpad/core/internal'

import { projectsTheme } from '../projects-theme'

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main Items'
  },
  {
    segment: 'page',
    title: 'Page',
    icon: <DashboardIcon />
  },
  {
    segment: 'page-2',
    title: 'Page 2',
    icon: <TimelineIcon />
  }
]

const AppProvider = ({ children }: { children: ReactNode }) => {
  const router = useDemoRouter('/page')

  return (
    <ThemeProvider theme={projectsTheme}>
      <CssBaseline />
      <MuiAppProvider navigation={NAVIGATION} router={router} theme={projectsTheme}>
        <DashboardLayout
          branding={{ title: 'React Projects', logo: '', homeUrl: '/' }}
          hideNavigation
        >
          {/* <PageContainer title="" breadcrumbs={[]} sx={{}}> */}
          {children}
          {/* </PageContainer> */}
        </DashboardLayout>
      </MuiAppProvider>
    </ThemeProvider>
  )
}

export default AppProvider
