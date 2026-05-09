'use client'

import { useAuth } from '@/lib/auth/AuthContext'

// user_metadata from Supabase is typed as { [key: string]: unknown }
// We define the subset we use from Google OAuth
interface GoogleUserMetadata {
  full_name?: string
  avatar_url?: string
}

function extractMetadata(raw: Record<string, unknown>): GoogleUserMetadata {
  return {
    full_name:  typeof raw.full_name  === 'string' ? raw.full_name  : undefined,
    avatar_url: typeof raw.avatar_url === 'string' ? raw.avatar_url : undefined,
  }
}

export function UserMenu(): JSX.Element | null {
  const { user, isLoading, signInWithGoogle, signOut } = useAuth()

  if (isLoading) {
    return <div className="w-[28px] h-[28px] rounded-full bg-[#F0EDEA] animate-pulse" />
  }

  if (user) {
    const meta    = extractMetadata(user.user_metadata ?? {})
    const initial = meta.full_name?.[0]?.toUpperCase()
      ?? user.email?.[0]?.toUpperCase()
      ?? '?'
    const name = meta.full_name?.split(' ')[0] ?? 'You'

    return (
      <button
        onClick={signOut}
        title={`Signed in as ${name} — tap to sign out`}
        className="flex items-center gap-[5px] bg-transparent border-none cursor-pointer p-0"
        aria-label={`Signed in as ${name}. Tap to sign out.`}
      >
        {meta.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={meta.avatar_url}
            alt={name}
            className="w-[26px] h-[26px] rounded-full object-cover border border-[#EDEAE4]"
          />
        ) : (
          <div className="w-[26px] h-[26px] rounded-full bg-[#1A1714] flex items-center justify-center text-[10px] font-bold text-white">
            {initial}
          </div>
        )}
        <span className="w-[5px] h-[5px] rounded-full bg-[#276127] flex-shrink-0" aria-hidden="true" />
      </button>
    )
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="flex items-center gap-[4px] text-[10px] font-semibold bg-[#F5F2EC] text-[#1A1714] rounded-full px-[9px] py-[4px] border-none cursor-pointer hover:bg-[#EDEAE4] transition-colors"
      aria-label="Sign in with Google to enable editing"
    >
      <i className="ti ti-brand-google text-[12px]" aria-hidden="true" />
      Sign in
    </button>
  )
}
