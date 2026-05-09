'use client'

import {
  createContext, useContext, useEffect,
  useState, useCallback, useRef,
} from 'react'
import type { User, SupabaseClient } from '@supabase/supabase-js'
import { createSupabaseBrowser } from '@/lib/supabase/client'

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null
  isLoading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthState>({
  user: null,
  isLoading: true,
  signInWithGoogle: async (): Promise<void> => {},
  signOut: async (): Promise<void> => {},
})

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]         = useState<User | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  // Stable ref — prevents supabase from being recreated on every render
  const supabaseRef = useRef<SupabaseClient>(createSupabaseBrowser())
  const supabase    = supabaseRef.current

  useEffect(() => {
    // 1. Restore session from existing cookie
    supabase.auth
      .getSession()
      .then(({ data }: { data: { session: { user: User } | null } }) => {
        setUser(data.session?.user ?? null)
        setLoading(false)
      })
      .catch((_err: unknown) => {
        setLoading(false)
      })

    // 2. Subscribe to live auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: string, session: { user: User } | null) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return (): void => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const signInWithGoogle = useCallback(async (): Promise<void> => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }, [supabase])

  const signOut = useCallback(async (): Promise<void> => {
    await supabase.auth.signOut()
    setUser(null)
  }, [supabase])

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthState {
  return useContext(AuthContext)
}
