import { Unsubscribe, User, onAuthStateChanged } from 'firebase/auth'
import { ReactNode, useEffect, useState } from 'react'

import AuthContext from '@/context/auth-context'
import { useLocalStorage } from '@/hooks/local-storage'
import auth from '@/lib/firebase'
import { logOut } from '@/lib/firebase/auth.service'

// type SessionType = Omit<AuthContextType, 'loading' | 'logoutHandler'>

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [userData, setUserData] = useLocalStorage('session', null)

  const loginHandler = (user: User) => {
    user.getIdToken().then((idToken) => {
      const session = {
        uid: user?.uid,
        displayName: user?.displayName || '',
        email: user?.email || '',
        accessToken: idToken || '',
        photoUrl: user.photoURL || ''
      }
      setUserData(session)
    })
  }

  const logoutHandler = () => {
    logOut()
    setUserData(null)
  }

  useEffect(() => {
    setLoading(true)
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          const session = {
            uid: user?.uid,
            displayName: user?.displayName || '',
            email: user?.email || '',
            accessToken: idToken || '',
            photoUrl: user.photoURL || ''
          }
          setUserData(session)
        })
        setLoading(false)
      } else {
        setUserData(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    console.log('userData: ', userData)
  }, [userData])

  return (
    <AuthContext.Provider value={{ session: userData, loading, loginHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
