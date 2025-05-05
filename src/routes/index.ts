import { createBrowserRouter } from 'react-router'

import AuthPage from '@/pages/auth'
import DashboardPage from '@/pages/dashboard/DashboardPage'

import App from '../App'
import ProtectedRoute from './protected-route'
import MainLayout from '../components/layout/main-layout'
import BoardPage from '../pages/dashboard/board'
import HomePage from '../pages/home'

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: MainLayout,
        children: [
          {
            path: '',
            Component: HomePage
          },
          {
            path: 'dashboard',
            Component: ProtectedRoute,
            children: [
              {
                path: '',
                Component: DashboardPage
              },
              {
                path: 'project',
                Component: BoardPage
              }
            ]
          }
        ]
      },
      {
        path: '/auth',
        Component: AuthPage
      }
    ]
  }
])

export default router
