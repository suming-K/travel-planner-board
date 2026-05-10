'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Client-side redirect — safe for both SSR and static export
export default function Home(): null {
  const router = useRouter()
  useEffect(() => {
    router.replace('/trips/trip-ny-2026')
  }, [router])
  return null
}
