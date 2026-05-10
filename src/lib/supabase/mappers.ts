import type {
  Trip, City, DayMeta, TripEvent, Place, Reservation,
  TransportLeg, ChecklistItem, Expense, Memory, Reminder,
  TripStatus, EventCategory, EventStatus, EventPriority,
  ReservationStatus, TransportType, ChecklistCategory,
  ExpenseCategory, CurrencyCode, PaymentMethod, RecurrenceRule,
} from '@/lib/types'

// ─── Type-safe DB row types (what Supabase actually returns) ──────────────────

export type DbTrip = {
  id: string
  title: string
  start_date: string
  end_date: string
  cover_image_url: string | null
  status: string
  created_by: string
  created_at: string
}

export type DbCity = {
  id: string
  trip_id: string
  name: string
  country: string
  arrive_date: string
  depart_date: string
  sort_order: number
}

export type DbDayMeta = {
  id: string
  trip_id: string
  date: string
  sunrise: string | null
  sunset: string | null
  weather_summary: string | null
  day_note: string | null
}

export type DbPlace = {
  id: string
  trip_id: string
  city_id: string
  name: string
  address: string | null
  google_place_id: string | null
  google_maps_url: string | null
  website_url: string | null
  opening_hours: string | null
  notes: string | null
  category: string
  lat: number | null
  lng: number | null
  visited: boolean
  visited_at: string | null
  favorite: boolean
  deleted_at: string | null
}

export type DbReservation = {
  id: string
  trip_id: string
  event_id: string | null
  place_id: string | null
  title: string
  status: string
  confirmation_code: string | null
  reservation_date: string | null
  reservation_time: string | null
  notes: string | null
  booking_url: string | null
  category: string
  deleted_at: string | null
}

export type DbEvent = {
  id: string
  trip_id: string
  city_id: string
  event_date: string
  start_time: string | null
  title: string
  description: string | null
  category: string
  status: string
  priority: string
  is_pinned: boolean
  sort_order: number
  place_id: string | null
  reservation_id: string | null
  deleted_at: string | null
}

export type DbTransportLeg = {
  id: string
  trip_id: string
  type: string
  carrier: string | null
  confirmation_code: string | null
  depart_at: string
  arrive_at: string
  depart_location: string
  arrive_location: string
  depart_timezone: string | null
  arrive_timezone: string | null
  notes: string | null
}

export type DbChecklistItem = {
  id: string
  trip_id: string
  title: string
  category: string
  is_checked: boolean
  checked_by: string | null
  sort_order: number
}

export type DbExpense = {
  id: string
  trip_id: string
  event_id: string | null
  title: string
  category: string
  amount_estimated: number | null
  amount_actual: number | null
  currency: string
  payment_method: string
  expense_date: string | null
}

export type DbMemory = {
  id: string
  trip_id: string
  event_id: string | null
  memory_date: string
  song_title: string | null
  song_artist: string | null
  note: string | null
}

export type DbReminder = {
  id: string
  trip_id: string
  title: string
  body: string | null
  recurrence: string
  trigger_time: string | null
  is_active: boolean
}

// ─── Mappers — DB row → AppState type ────────────────────────────────────────

export function toTrip(r: DbTrip): Trip {
  return {
    id:            r.id,
    title:         r.title,
    startDate:     r.start_date,
    endDate:       r.end_date,
    coverImageUrl: r.cover_image_url,
    status:        r.status as TripStatus,
    createdBy:     r.created_by,
    createdAt:     r.created_at,
  }
}

export function toCity(r: DbCity): City {
  return {
    id:          r.id,
    tripId:      r.trip_id,
    name:        r.name,
    country:     r.country,
    arriveDate:  r.arrive_date,
    departDate:  r.depart_date,
    sortOrder:   r.sort_order,
  }
}

export function toDayMeta(r: DbDayMeta): DayMeta {
  return {
    id:             r.id,
    tripId:         r.trip_id,
    date:           r.date,
    sunrise:        r.sunrise,
    sunset:         r.sunset,
    weatherSummary: r.weather_summary,
    dayNote:        r.day_note,
  }
}

export function toPlace(r: DbPlace): Place {
  return {
    id:             r.id,
    tripId:         r.trip_id,
    cityId:         r.city_id,
    name:           r.name,
    address:        r.address,
    googlePlaceId:  r.google_place_id,
    googleMapsUrl:  r.google_maps_url,
    websiteUrl:     r.website_url,
    openingHours:   r.opening_hours,
    notes:          r.notes,
    category:       r.category,
    lat:            r.lat,
    lng:            r.lng,
    visited:        r.visited,
    visitedAt:      r.visited_at,
    favorite:       r.favorite,
    deletedAt:      r.deleted_at,
  }
}

export function toReservation(r: DbReservation): Reservation {
  return {
    id:               r.id,
    tripId:           r.trip_id,
    eventId:          r.event_id,
    placeId:          r.place_id,
    title:            r.title,
    status:           r.status as ReservationStatus,
    confirmationCode: r.confirmation_code,
    reservationDate:  r.reservation_date,
    reservationTime:  r.reservation_time,
    notes:            r.notes,
    bookingUrl:       r.booking_url,
    category:         r.category,
    deletedAt:        r.deleted_at,
  }
}

export function toTripEvent(r: DbEvent): TripEvent {
  return {
    id:            r.id,
    tripId:        r.trip_id,
    cityId:        r.city_id,
    eventDate:     r.event_date,
    startTime:     r.start_time,
    title:         r.title,
    description:   r.description,
    category:      r.category as EventCategory,
    status:        r.status as EventStatus,
    priority:      r.priority as EventPriority,
    isPinned:      r.is_pinned,
    sortOrder:     r.sort_order,
    placeId:       r.place_id,
    reservationId: r.reservation_id,
    deletedAt:     r.deleted_at,
  }
}

export function toTransportLeg(r: DbTransportLeg): TransportLeg {
  return {
    id:               r.id,
    tripId:           r.trip_id,
    type:             r.type as TransportType,
    carrier:          r.carrier,
    confirmationCode: r.confirmation_code,
    departAt:         r.depart_at,
    arriveAt:         r.arrive_at,
    departLocation:   r.depart_location,
    arriveLocation:   r.arrive_location,
    departTimezone:   r.depart_timezone,
    arriveTimezone:   r.arrive_timezone,
    notes:            r.notes,
  }
}

export function toChecklistItem(r: DbChecklistItem): ChecklistItem {
  return {
    id:        r.id,
    tripId:    r.trip_id,
    title:     r.title,
    category:  r.category as ChecklistCategory,
    isChecked: r.is_checked,
    checkedBy: r.checked_by,
    sortOrder: r.sort_order,
  }
}

export function toExpense(r: DbExpense): Expense {
  return {
    id:               r.id,
    tripId:           r.trip_id,
    eventId:          r.event_id,
    title:            r.title,
    category:         r.category as ExpenseCategory,
    amountEstimated:  r.amount_estimated,
    amountActual:     r.amount_actual,
    currency:         r.currency as CurrencyCode,
    paymentMethod:    r.payment_method as PaymentMethod,
    expenseDate:      r.expense_date,
  }
}

export function toMemory(r: DbMemory): Memory {
  return {
    id:          r.id,
    tripId:      r.trip_id,
    eventId:     r.event_id,
    memoryDate:  r.memory_date,
    songTitle:   r.song_title,
    songArtist:  r.song_artist,
    note:        r.note,
  }
}

export function toReminder(r: DbReminder): Reminder {
  return {
    id:          r.id,
    tripId:      r.trip_id,
    title:       r.title,
    body:        r.body,
    recurrence:  r.recurrence as RecurrenceRule,
    triggerTime: r.trigger_time,
    isActive:    r.is_active,
  }
}
