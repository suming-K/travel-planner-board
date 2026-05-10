'use client'

import {
  createContext, useContext, useEffect,
  useState, useCallback, useRef,
} from 'react'
import type { User, SupabaseClient, Session } from '@supabase/supabase-js'
import { createSupabaseBrowser } from '@/lib/supabase/client'

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null
  isLoading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

// ─── Context default — safe values for SSR ────────────────────────────────────

const AuthContext = createContext<AuthState>({
  user: null,
  isLoading: false,          // false not true — prevents SSR hydration mismatch
  signInWithGoogle: async (): Promise<void> => {},
  signOut: async (): Promise<void> => {},
})

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [user, setUser]         = useState<User | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)  // false — no SSR flicker

  // useRef with null initial — createSupabaseBrowser() called lazily in useEffect
  // Prevents browser API access during SSR
  const supabaseRef = useRef<SupabaseClient | null>(null)

  function getClient(): SupabaseClient {
    if (!supabaseRef.current) {
      supabaseRef.current = createSupabaseBrowser()
    }
    return supabaseRef.current
  }

  useEffect(() => {
    // All browser-side auth logic runs only inside useEffect — never on server
    const client = getClient()
    setLoading(true)

    client.auth
      .getSession()
      .then(({ data }: { data: { session: Session | null } }) => {
        setUser(data.session?.user ?? null)
        setLoading(false)
      })
      .catch((): void => {
        setLoading(false)
      })

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(
      (_event: string, session: Session | null): void => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return (): void => {
      subscription.unsubscribe()
    }
  }, []) // empty deps — run once on mount

  const signInWithGoogle = useCallback(async (): Promise<void> => {
    await getClient().auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }, [])

  const signOut = useCallback(async (): Promise<void> => {
    await getClient().auth.signOut()
    setUser(null)
  }, [])

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
