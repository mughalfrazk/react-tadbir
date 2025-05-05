import { Outlet } from 'react-router'

import AppProvider from '@/providers/app-provider'

import AuthProvider from './providers/auth-provider'

const App = () => (
  <AppProvider>
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  </AppProvider>
)

export default App
