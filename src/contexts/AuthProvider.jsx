import { useCallback, useEffect, useMemo, useState } from 'react'
import { getCurrentSession, onAuthChange, signIn, signOut } from '../services/authService'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // começa carregando: ainda não sabemos se há uma sessão salva no navegador
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    getCurrentSession().then((session) => {
      if (!active) return
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    // mantém o estado em dia se o login/logout acontecer em outra aba
    const unsubscribe = onAuthChange((session) => setUser(session?.user ?? null))
    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  const login = useCallback(async (email, password) => {
    await signIn(email, password)
  }, [])

  const logout = useCallback(async () => {
    await signOut()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, isLoading, isAuthenticated: Boolean(user), login, logout }),
    [user, isLoading, login, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
