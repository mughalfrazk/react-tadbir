import { Unsubscribe, onAuthStateChanged } from 'firebase/auth'
import { ReactNode, useEffect, useState } from 'react'

import AuthContext, { AuthContextType } from '@/context/auth-context'
import auth from '@/lib/firebase'
import { logOut } from '@/lib/firebase/auth.service'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [userData, setUserData] = useState<Omit<AuthContextType, 'loading' | 'logoutHandler'>>({
    displayName: '',
    email: '',
    accessToken: '',
    photoUrl: '',
    uid: ''
  })

  const logoutHandler = () => {
    logOut()
    setUserData({
      displayName: '',
      email: '',
      accessToken: '',
      photoUrl: '',
      uid: ''
    })
  }

  useEffect(() => {
    setLoading(true)
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          setUserData({
            uid: user?.uid,
            displayName: user?.displayName || '',
            email: user?.email || '',
            accessToken: idToken || '',
            photoUrl: user.photoURL || ''
          })
        })
        setLoading(false)
      } else {
        setUserData({
          displayName: '',
          email: '',
          accessToken: '',
          photoUrl: '',
          uid: ''
        })
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ ...userData, loading, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
