'use client'

import { useEffect, useRef } from 'react'
import { useAppStore } from '@/lib/store'
import { fetchAllTripData } from '@/lib/supabase/queries'
import {
  SEED_TRIP, SEED_CITIES, SEED_EVENTS, SEED_RESERVATIONS,
  SEED_TRANSPORT, SEED_CHECKLIST, SEED_DAY_METAS,
  SEED_REMINDERS, SEED_MEMORIES,
} from '@/data/seed'
import { SEED_PLACES } from '@/data/seedPlaces'
import { SEED_EXPENSES } from '@/data/seedExpenses'

// Seed state object — defined outside component, no recreation on re-render
const SEED_STATE = {
  activeTrip:     SEED_TRIP,
  cities:         SEED_CITIES,
  events:         SEED_EVENTS,
  reservations:   SEED_RESERVATIONS,
  transport:      SEED_TRANSPORT,
  checklistItems: SEED_CHECKLIST,
  dayMetas:       SEED_DAY_METAS,
  reminders:      SEED_REMINDERS,
  memories:       SEED_MEMORIES,
  places:         SEED_PLACES,
  expenses:       SEED_EXPENSES,
}

export function useTripData(): void {
  // Track whether we've already initialized — prevents double-fetch on StrictMode
  const initialized = useRef<boolean>(false)

  useEffect(() => {
    // Already ran — skip (React StrictMode double-invokes effects in dev)
    if (initialized.current) return
    initialized.current = true

    const storeState = useAppStore.getState()

    // If persist already restored data from localStorage, upgrade to DB quietly
    if (storeState.activeTrip) {
      fetchAllTripData()
        .then(data => {
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
        })
        .catch((): void => {
          // persist data is fine — keep as-is
        })
      return
    }

    // No persisted data — inject seed immediately (synchronous, no flash)
    useAppStore.setState(SEED_STATE)

    // Then upgrade to DB data in background
    fetchAllTripData()
      .then(data => {
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
      })
      .catch((): void => {
        // Seed data is already in store — no action needed
      })
  }, []) // empty deps — run once on mount only
}
