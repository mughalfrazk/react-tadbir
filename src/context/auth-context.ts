import { createContext, useContext } from 'react'

export type AuthContextType = {
  displayName: string
  email: string
  accessToken: string
  photoUrl: string
  uid: string
  loading: boolean
  logoutHandler: () => void
}

const AuthContext = createContext<AuthContextType>({
  displayName: '',
  email: '',
  accessToken: '',
  photoUrl: '',
  uid: '',
  loading: false,
  logoutHandler: () => {}
})

export default AuthContext
export const useAuth = () => useContext(AuthContext)
