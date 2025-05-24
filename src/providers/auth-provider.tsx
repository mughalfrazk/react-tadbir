import { Session } from '@supabase/supabase-js'
import { ReactNode, useCallback, useEffect, useState } from 'react'

import AuthContext, { Session as AuthSession } from '@/context/auth-context'
import { useLocalStorage } from '@/hooks/local-storage'
import supabase from '@/lib/supabase'
import { logOut } from '@/lib/supabase/auth.service'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [userData, setUserData] = useLocalStorage('session', null)

  const loginHandler = (user: AuthSession) => {
    setUserData(user)
  }

  const logoutHandler = () => {
    setUserData(null)
    logOut()
  }

  const handleSession = useCallback((session: Session | null) => {
    if (session) {
      setUserData({
        uid: session.user.id,
        displayName: session.user.user_metadata?.name,
        email: session.user.email,
        accessToken: session.access_token,
        photoUrl: session.user.user_metadata?.avatar_url
      })
    } else {
      setUserData(null)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      handleSession(session)
      setLoading(false)
    })

    return () => data.subscription.unsubscribe()
  }, [handleSession])

  return (
    <AuthContext.Provider value={{ session: userData, loading, loginHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
