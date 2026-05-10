'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Trip, City, TripEvent, Reservation, TransportLeg,
  ChecklistItem, DayMeta, Reminder, Memory, Place, Expense,
  ReservationStatus, EventStatus, ChecklistCategory,
} from '@/lib/types'
import {
  SEED_TRIP, SEED_CITIES, SEED_EVENTS, SEED_RESERVATIONS,
  SEED_TRANSPORT, SEED_CHECKLIST, SEED_DAY_METAS, SEED_REMINDERS, SEED_MEMORIES,
} from '@/data/seed'
import { SEED_PLACES } from '@/data/seedPlaces'
import { SEED_EXPENSES } from '@/data/seedExpenses'
import { getTodayIso, calcProgress } from '@/lib/utils'

interface AppState {
  activeTrip: Trip | null
  cities: City[]
  events: TripEvent[]
  reservations: Reservation[]
  transport: TransportLeg[]
  checklistItems: ChecklistItem[]
  dayMetas: DayMeta[]
  reminders: Reminder[]
  memories: Memory[]
  places: Place[]
  expenses: Expense[]

  selectedDate: string
  reservationFilter: ReservationStatus | 'all'
  activeSheet: string | null
  isOnline: boolean

  setActiveTrip: (trip: Trip) => void
  hydrateSeedData: () => void
  setSelectedDate: (date: string) => void
  reorderEvents: (date: string, fromIdx: number, toIdx: number) => void
  updateEventStatus: (id: string, status: EventStatus) => void
  setReservationFilter: (f: ReservationStatus | 'all') => void
  updateReservationStatus: (id: string, status: ReservationStatus, code?: string) => void
  toggleChecklistItem: (id: string, userId: string) => void
  markPlaceVisited: (id: string, visited: boolean) => void
  toggleFavorite: (id: string) => void
  openSheet: (id: string) => void
  closeSheet: () => void
  setOnline: (v: boolean) => void

  getTodayEvents: () => TripEvent[]
  getEventsByDate: (date: string) => TripEvent[]
  getEventDates: () => string[]
  getDayMeta: (date: string) => DayMeta | null
  getTodayReminders: () => Reminder[]
  getReservationById: (id: string) => Reservation | null
  getChecklistByCategory: (cat: ChecklistCategory) => ChecklistItem[]
  getReservationProgress: () => { done: number; total: number; pct: number }
  getChecklistProgress: () => { done: number; total: number; pct: number }
  getPlaceById: (id: string) => Place | null
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeTrip: null,
      cities: [],
      events: [],
      reservations: [],
      transport: [],
      checklistItems: [],
      dayMetas: [],
      reminders: [],
      memories: [],
      places: [],
      expenses: [],
      selectedDate: getTodayIso(),
      reservationFilter: 'all',
      activeSheet: null,
      isOnline: true,

      setActiveTrip: (trip) => set({ activeTrip: trip }),

      hydrateSeedData: () => set({
        activeTrip: SEED_TRIP,
        cities: SEED_CITIES,
        events: SEED_EVENTS,
        reservations: SEED_RESERVATIONS,
        transport: SEED_TRANSPORT,
        checklistItems: SEED_CHECKLIST,
        dayMetas: SEED_DAY_METAS,
        reminders: SEED_REMINDERS,
        memories: SEED_MEMORIES,
        places: SEED_PLACES,
        expenses: SEED_EXPENSES,
        selectedDate: getTodayIso(),
      }),

      setSelectedDate: (date) => set({ selectedDate: date }),

      reorderEvents: (date, fromIdx, toIdx) => {
        const prev = get().events
        const dayEvents = prev
          .filter(e => e.eventDate === date && !e.deletedAt)
          .sort((a, b) => a.sortOrder - b.sortOrder)
        const reordered = [...dayEvents]
        const [moved] = reordered.splice(fromIdx, 1)
        reordered.splice(toIdx, 0, moved)
        const updated = reordered.map((e, i) => ({ ...e, sortOrder: i }))
        set({ events: prev.map(e => updated.find(u => u.id === e.id) ?? e) })
      },

      updateEventStatus: (id, status) =>
        set(s => ({ events: s.events.map(e => e.id === id ? { ...e, status } : e) })),

      setReservationFilter: (f) => set({ reservationFilter: f }),

      updateReservationStatus: (id, status, code) =>
        set(s => ({
          reservations: s.reservations.map(r =>
            r.id === id
              ? { ...r, status, confirmationCode: code ?? r.confirmationCode }
              : r,
          ),
        })),

      toggleChecklistItem: (id, userId) =>
        set(s => ({
          checklistItems: s.checklistItems.map(item =>
            item.id === id
              ? { ...item, isChecked: !item.isChecked, checkedBy: !item.isChecked ? userId : null }
              : item,
          ),
        })),

      markPlaceVisited: (id, visited) =>
        set(s => ({
          places: s.places.map(p =>
            p.id === id
              ? { ...p, visited, visitedAt: visited ? new Date().toISOString() : null }
              : p,
          ),
        })),

      toggleFavorite: (id) =>
        set(s => ({
          places: s.places.map(p => p.id === id ? { ...p, favorite: !p.favorite } : p),
        })),

      openSheet: (id) => set({ activeSheet: id }),
      closeSheet: () => set({ activeSheet: null }),
      setOnline: (v) => set({ isOnline: v }),

      getTodayEvents: () => {
        const today = getTodayIso()
        return get().events
          .filter(e => e.eventDate === today && !e.deletedAt)
          .sort((a, b) =>
            !a.startTime ? 1 : !b.startTime ? -1 : a.startTime.localeCompare(b.startTime),
          )
      },

      getEventsByDate: (date) =>
        get().events
          .filter(e => e.eventDate === date && !e.deletedAt)
          .sort((a, b) =>
            !a.startTime ? 1 : !b.startTime ? -1 : a.startTime.localeCompare(b.startTime),
          ),

      getEventDates: () =>
        [...new Set(
          get().events.filter(e => !e.deletedAt).map(e => e.eventDate),
        )].sort(),

      getDayMeta: (date) => get().dayMetas.find(m => m.date === date) ?? null,

      getTodayReminders: () => get().reminders.filter(r => r.isActive),

      getReservationById: (id) => get().reservations.find(r => r.id === id) ?? null,

      getChecklistByCategory: (cat) =>
        get().checklistItems
          .filter(i => i.category === cat)
          .sort((a, b) => a.sortOrder - b.sortOrder),

      getReservationProgress: () => {
        const all = get().reservations.filter(r => !r.deletedAt)
        const done = all.filter(r => r.status === 'booked' || r.status === 'done').length
        return { done, total: all.length, pct: calcProgress(done, all.length) }
      },

      getChecklistProgress: () => {
        const all = get().checklistItems
        const done = all.filter(i => i.isChecked).length
        return { done, total: all.length, pct: calcProgress(done, all.length) }
      },

      getPlaceById: (id) => get().places.find(p => p.id === id) ?? null,
    }),

    {
      name: 'travel-planner-v1',
      partialize: (state) => ({
        activeTrip: state.activeTrip,
        cities: state.cities,
        events: state.events,
        reservations: state.reservations,
        checklistItems: state.checklistItems,
        dayMetas: state.dayMetas,
        reminders: state.reminders,
        places: state.places,
        expenses: state.expenses,
        selectedDate: state.selectedDate,
      }),
    },
  ),
)
