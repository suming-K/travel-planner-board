'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { fetchAllTripData } from '@/lib/supabase/queries'

type LoadState = 'idle' | 'loading' | 'db' | 'seed' | 'error'

export function useTripData() {
  const hydrateSeedData = useAppStore(s => s.hydrateSeedData)
  const activeTrip      = useAppStore(s => s.activeTrip)
  const [loadState, setLoadState] = useState<LoadState>('idle')

  useEffect(() => {
    // Already loaded (Zustand persist restored from localStorage)
    if (activeTrip) {
      setLoadState('db')
      return
    }

    let cancelled = false
    setLoadState('loading')

    fetchAllTripData()
      .then(data => {
        if (cancelled) return
        // Hydrate store with DB data (same shape as seed hydrate)
        useAppStore.setState({
          activeTrip:     data.activeTrip,
          cities:         data.cities,
          dayMetas:       data.dayMetas,
          places:         data.places,
          reservations:   data.reservations,
          events:         data.events,
          transport:      data.transport,
          checklistItems: data.checklistItems,
          expenses:       data.expenses,
          memories:       data.memories,
          reminders:      data.reminders,
        })
        setLoadState('db')
      })
      .catch(() => {
        if (cancelled) return
        // Full fallback to seed data
        hydrateSeedData()
        setLoadState('seed')
      })

    return () => { cancelled = true }
  }, [activeTrip, hydrateSeedData])

  return { loadState, isLoading: loadState === 'loading' || loadState === 'idle' }
}
