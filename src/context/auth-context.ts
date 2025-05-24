import { createContext, useContext } from 'react'

export type Session = {
  displayName: string
  email: string
  accessToken: string
  photoUrl: string
  uid: string
}

export type AuthContextType = {
  session: Session | null
  loading: boolean
  loginHandler: (s: Session) => void
  logoutHandler: () => void
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: false,
  loginHandler: () => {},
  logoutHandler: () => {}
})

export default AuthContext
export const useAuth = () => useContext(AuthContext)
