'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'

export function OfflineBanner(): JSX.Element | null {
  const isOnline  = useAppStore(s => s.isOnline)
  const setOnline = useAppStore(s => s.setOnline)

  // Sync window network events → store
  useEffect(() => {
    const goOnline  = () => setOnline(true)
    const goOffline = () => setOnline(false)

    // Set initial state (SSR safe)
    setOnline(navigator.onLine)

    window.addEventListener('online',  goOnline)
    window.addEventListener('offline', goOffline)

    return () => {
      window.removeEventListener('online',  goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [setOnline])

  // Nothing to render when online
  if (isOnline) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-0 left-0 right-0 z-[60] max-w-[430px] mx-auto"
    >
      <div className="flex items-center gap-[8px] px-[16px] py-[9px] bg-[#1A1714]">
        {/* Pulsing dot */}
        <span className="relative flex h-[7px] w-[7px] flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8B86D] opacity-75" />
          <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-[#E8B86D]" />
        </span>

        <p className="text-[11px] font-medium text-[#F5F0E8] flex-1">
          You're offline — showing cached data
        </p>

        <i className="ti ti-wifi-off text-[13px] text-[#7A7060] flex-shrink-0" aria-hidden="true" />
      </div>
    </div>
  )
}
