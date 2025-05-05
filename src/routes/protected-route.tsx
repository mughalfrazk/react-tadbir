import { Navigate, Outlet } from 'react-router'

import { useAuth } from '@/context/auth-context'

const ProtectedRoute = () => {
  const auth = useAuth()

  if (!auth.accessToken) return <Navigate to="/auth" />

  return <Outlet />
}

export default ProtectedRoute
