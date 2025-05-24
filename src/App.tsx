import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet } from 'react-router'

import AppProvider from '@/providers/app-provider'

import AuthProvider from './providers/auth-provider'

const App = () => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (e) => {
        console.log('Query Cache Error:', e)
      }
    }),
    mutationCache: new MutationCache({
      onError: (e) => {
        console.log('Mutation Cache Error:', e)
      }
    })
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
