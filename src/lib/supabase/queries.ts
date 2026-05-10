import { getSupabase } from '@/lib/supabase/client'
import {
  toTrip, toCity, toDayMeta, toPlace, toReservation,
  toTripEvent, toTransportLeg, toChecklistItem,
  toExpense, toMemory, toReminder,
} from '@/lib/supabase/mappers'
import type {
  Trip, City, DayMeta, TripEvent, Place, Reservation,
  TransportLeg, ChecklistItem, Expense, Memory, Reminder,
} from '@/lib/types'

// Seed data fallback imports — used when DB fetch fails
import {
  SEED_TRIP, SEED_CITIES, SEED_EVENTS, SEED_RESERVATIONS,
  SEED_TRANSPORT, SEED_CHECKLIST, SEED_DAY_METAS,
  SEED_REMINDERS, SEED_MEMORIES,
} from '@/data/seed'
import { SEED_PLACES } from '@/data/seedPlaces'
import { SEED_EXPENSES } from '@/data/seedExpenses'

const TRIP_ID = 'trip-ny-2026'

// ─── Helper — log errors without crashing ────────────────────────────────────
function warn(table: string, error: unknown) {
  console.warn(`[supabase] ${table} fetch failed — using seed fallback`, error)
}

// ─── Fetch functions (each returns AppState type, never throws) ───────────────

export async function fetchTrip(): Promise<Trip> {
  try {
    const { data, error } = await getSupabase()
      .from('trips')
      .select('*')
      .eq('id', TRIP_ID)
      .single()
    if (error || !data) throw error
    return toTrip(data)
  } catch (e) {
    warn('trips', e)
    return SEED_TRIP
  }
}

export async function fetchCities(): Promise<City[]> {
  try {
    const { data, error } = await getSupabase()
      .from('cities')
      .select('*')
      .eq('trip_id', TRIP_ID)
      .order('sort_order')
    if (error || !data) throw error
    return data.map(toCity)
  } catch (e) {
    warn('cities', e)
    return SEED_CITIES
  }
}

export async function fetchDayMetas(): Promise<DayMeta[]> {
  try {
    const { data, error } = await getSupabase()
      .from('day_meta')
      .select('*')
      .eq('trip_id', TRIP_ID)
      .order('date')
    if (error || !data) throw error
    return data.map(toDayMeta)
  } catch (e) {
    warn('day_meta', e)
    return SEED_DAY_METAS
  }
}

export async function fetchPlaces(): Promise<Place[]> {
  try {
    const { data, error } = await getSupabase()
      .from('places')
      .select('*')
      .eq('trip_id', TRIP_ID)
      .is('deleted_at', null)
    if (error || !data) throw error
    return data.map(toPlace)
  } catch (e) {
    warn('places', e)
    return SEED_PLACES
  }
}

export async function fetchReservations(): Promise<Reservation[]> {
  try {
    const { data, error } = await getSupabase()
      .from('reservations')
      .select('*')
      .eq('trip_id', TRIP_ID)
      .is('deleted_at', null)
      .order('reservation_date', { nullsFirst: true })
    if (error || !data) throw error
    return data.map(toReservation)
  } catch (e) {
    warn('reservations', e)
    return SEED_RESERVATIONS
  }
}

export async function fetchEvents(): Promise<TripEvent[]> {
  try {
    const { data, error } = await getSupabase()
      .from('events')
      .select('*')
      .eq('trip_id', TRIP_ID)
      .is('deleted_at', null)
      .order('event_date')
      .order('sort_order')
    if (error || !data) throw error
    return data.map(toTripEvent)
  } catch (e) {
    warn('events', e)
    return SEED_EVENTS
  }
}

export async function fetchTransport(): Promise<TransportLeg[]> {
  try {
    const { data, error } = await getSupabase()
      .from('transport_legs')
      .select('*')
      .eq('trip_id', TRIP_ID)
      .order('depart_at')
    if (error || !data) throw error
    return data.map(toTransportLeg)
  } catch (e) {
    warn('transport_legs', e)
    return SEED_TRANSPORT
  }
}

export async function fetchChecklistItems(): Promise<ChecklistItem[]> {
  try {
    const { data, error } = await getSupabase()
      .from('checklist_items')
      .select('*')
      .eq('trip_id', TRIP_ID)
      .order('sort_order')
    if (error || !data) throw error
    return data.map(toChecklistItem)
  } catch (e) {
    warn('checklist_items', e)
    return SEED_CHECKLIST
  }
}

export async function fetchExpenses(): Promise<Expense[]> {
  try {
    const { data, error } = await getSupabase()
      .from('expenses')
      .select('*')
      .eq('trip_id', TRIP_ID)
    if (error || !data) throw error
    return data.map(toExpense)
  } catch (e) {
    warn('expenses', e)
    return SEED_EXPENSES
  }
}

export async function fetchMemories(): Promise<Memory[]> {
  try {
    const { data, error } = await getSupabase()
      .from('memories')
      .select('*')
      .eq('trip_id', TRIP_ID)
      .order('memory_date')
    if (error || !data) throw error
    return data.map(toMemory)
  } catch (e) {
    warn('memories', e)
    return SEED_MEMORIES
  }
}

export async function fetchReminders(): Promise<Reminder[]> {
  try {
    const { data, error } = await getSupabase()
      .from('reminders')
      .select('*')
      .eq('trip_id', TRIP_ID)
      .eq('is_active', true)
    if (error || !data) throw error
    return data.map(toReminder)
  } catch (e) {
    warn('reminders', e)
    return SEED_REMINDERS
  }
}

// ─── Fetch all at once — used in DashboardPage on mount ──────────────────────
export async function fetchAllTripData() {
  const [
    trip, cities, dayMetas, places, reservations,
    events, transport, checklistItems, expenses, memories, reminders,
  ] = await Promise.all([
    fetchTrip(),
    fetchCities(),
    fetchDayMetas(),
    fetchPlaces(),
    fetchReservations(),
    fetchEvents(),
    fetchTransport(),
    fetchChecklistItems(),
    fetchExpenses(),
    fetchMemories(),
    fetchReminders(),
  ])

  return {
    activeTrip: trip,
    cities,
    dayMetas,
    places,
    reservations,
    events,
    transport,
    checklistItems,
    expenses,
    memories,
    reminders,
  }
}
