'use client'

import { useAuth } from '@/lib/auth/AuthContext'

export function UserMenu() {
  const { user, isLoading, signInWithGoogle, signOut } = useAuth()

  // Don't flash anything during hydration
  if (isLoading) {
    return (
      <div className="w-[28px] h-[28px] rounded-full bg-[#F0EDEA] animate-pulse" />
    )
  }

  // Logged in — show avatar + name initial, tap to sign out
  if (user) {
    const initial  = (user.user_metadata?.full_name as string)?.[0]?.toUpperCase()
      ?? user.email?.[0]?.toUpperCase()
      ?? '?'
    const name     = (user.user_metadata?.full_name as string)?.split(' ')[0] ?? 'You'

    return (
      <button
        onClick={signOut}
        title={`Signed in as ${name} — tap to sign out`}
        className="flex items-center gap-[5px] bg-transparent border-none cursor-pointer p-0"
        aria-label={`Signed in as ${name}. Tap to sign out.`}
      >
        {/* Avatar from Google or initial fallback */}
        {user.user_metadata?.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.user_metadata.avatar_url as string}
            alt={name}
            className="w-[26px] h-[26px] rounded-full object-cover border border-[#EDEAE4]"
          />
        ) : (
          <div className="w-[26px] h-[26px] rounded-full bg-[#1A1714] flex items-center justify-center text-[10px] font-bold text-white">
            {initial}
          </div>
        )}
        {/* Online edit indicator dot */}
        <span className="w-[5px] h-[5px] rounded-full bg-[#276127] flex-shrink-0" aria-hidden="true" />
      </button>
    )
  }

  // Not logged in — show compact sign-in button
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
