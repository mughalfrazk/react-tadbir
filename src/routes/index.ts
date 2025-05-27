import { createBrowserRouter } from 'react-router'

import MainLayout from '@/components/layout/main-layout'
import AuthPage from '@/pages/auth'
import DashboardPage from '@/pages/dashboard'
import CreateProjectPage from '@/pages/dashboard/project/create'
import ProjectDetailPage from '@/pages/dashboard/project/detail'
import HomePage from '@/pages/home'

import ProtectedRoute from './protected-route'
import App from '../App'

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
                children: [
                  {
                    path: 'create',
                    Component: CreateProjectPage
                  },
                  {
                    path: ':project_id',
                    Component: ProjectDetailPage
                  }
                ]
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
