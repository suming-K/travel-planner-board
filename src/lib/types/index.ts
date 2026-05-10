// ─── Enums ────────────────────────────────────────────────────────────────────

export type TripStatus         = 'planning' | 'active' | 'completed' | 'archived'
export type MemberRole         = 'owner' | 'editor'
export type EventCategory      = 'activity' | 'meal' | 'transit' | 'leisure' | 'special'
export type EventStatus        = 'upcoming' | 'in_progress' | 'done' | 'delayed' | 'skipped'
export type EventPriority      = 'must_do' | 'high' | 'medium' | 'low'
export type ReservationStatus  = 'needed' | 'booked' | 'rush_attempt' | 'walk_in' | 'done'
export type TransportType      = 'flight' | 'train' | 'rental_car' | 'bus' | 'ferry' | 'other'
export type ChecklistCategory  = 'essential' | 'electronics' | 'clothing' | 'toiletries' | 'health' | 'other'
export type ExpenseCategory    = 'transport' | 'accommodation' | 'food' | 'activity' | 'shopping' | 'other'
export type CurrencyCode       = 'USD' | 'CAD' | 'KRW'
export type PaymentMethod      = 'card' | 'cash' | 'prepaid'
export type RecurrenceRule     = 'once' | 'daily' | 'weekly'

// ─── Soft delete mixin ────────────────────────────────────────────────────────

export interface SoftDeletable {
  deletedAt: string | null
}

// ─── Core entities ────────────────────────────────────────────────────────────

export interface Profile {
  id: string
  email: string
  displayName: string
  avatarUrl: string | null
  createdAt: string
}

export interface Trip {
  id: string
  title: string
  startDate: string
  endDate: string
  coverImageUrl: string | null
  status: TripStatus
  createdBy: string
  createdAt: string
  members?: TripMember[]
  cities?: City[]
}

export interface TripMember {
  id: string
  tripId: string
  userId: string
  role: MemberRole
  joinedAt: string
  profile?: Profile
}

export interface City {
  id: string
  tripId: string
  name: string
  country: string
  arriveDate: string
  departDate: string
  sortOrder: number
}

export interface DayMeta {
  id: string
  tripId: string
  date: string
  sunrise: string | null
  sunset: string | null
  weatherSummary: string | null
  dayNote: string | null
}

// ─── Events ───────────────────────────────────────────────────────────────────

export interface TripEvent extends SoftDeletable {
  id: string
  tripId: string
  cityId: string
  eventDate: string
  startTime: string | null
  title: string
  description: string | null
  category: EventCategory
  status: EventStatus
  priority: EventPriority
  isPinned: boolean
  sortOrder: number
  placeId: string | null
  reservationId: string | null
  place?: Place
  reservation?: Reservation
}

// ─── Places ───────────────────────────────────────────────────────────────────

export interface Place extends SoftDeletable {
  id: string
  tripId: string
  cityId: string
  name: string
  address: string | null
  googlePlaceId: string | null
  googleMapsUrl: string | null
  websiteUrl: string | null
  openingHours: string | null
  notes: string | null
  category: string
  lat: number | null
  lng: number | null
  visited: boolean
  visitedAt: string | null
  favorite: boolean
}

// ─── Reservations ─────────────────────────────────────────────────────────────

export interface Reservation extends SoftDeletable {
  id: string
  tripId: string
  eventId: string | null
  placeId: string | null
  title: string
  status: ReservationStatus
  confirmationCode: string | null
  reservationDate: string | null
  reservationTime: string | null
  notes: string | null
  bookingUrl: string | null
  category: string
}

// ─── Transport ────────────────────────────────────────────────────────────────

export interface TransportLeg {
  id: string
  tripId: string
  type: TransportType
  carrier: string | null
  confirmationCode: string | null
  departAt: string
  arriveAt: string
  departLocation: string
  arriveLocation: string
  departTimezone: string | null
  arriveTimezone: string | null
  notes: string | null
}

// ─── Checklist ────────────────────────────────────────────────────────────────

export interface ChecklistItem {
  id: string
  tripId: string
  title: string
  category: ChecklistCategory
  isChecked: boolean
  checkedBy: string | null
  sortOrder: number
}

// ─── Expenses ─────────────────────────────────────────────────────────────────

export interface Expense {
  id: string
  tripId: string
  eventId: string | null
  title: string
  category: ExpenseCategory
  amountEstimated: number | null
  amountActual: number | null
  currency: CurrencyCode
  paymentMethod: PaymentMethod
  expenseDate: string | null
}

// ─── Memories ─────────────────────────────────────────────────────────────────

export interface Memory {
  id: string
  tripId: string
  eventId: string | null
  memoryDate: string
  songTitle: string | null
  songArtist: string | null
  note: string | null
}

// ─── Reminders ────────────────────────────────────────────────────────────────

export interface Reminder {
  id: string
  tripId: string
  title: string
  body: string | null
  recurrence: RecurrenceRule
  triggerTime: string | null
  isActive: boolean
}

// ─── API response types ───────────────────────────────────────────────────────

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string }

export interface BudgetSummary {
  byCategory: {
    category: ExpenseCategory
    estimated: number
    actual: number
    currency: CurrencyCode
  }[]
  totals: {
    USD: { estimated: number; actual: number }
    CAD: { estimated: number; actual: number }
  }
  byPaymentMethod: {
    cash: number
    card: number
    prepaid: number
  }
}
