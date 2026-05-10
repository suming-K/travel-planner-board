import type { ReservationStatus, EventPriority, EventStatus, CurrencyCode } from '@/lib/types'

// ─── Date helpers ─────────────────────────────────────────────────────────────

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  }).format(new Date(iso + 'T00:00:00'))
}

export function formatDateShort(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  }).format(new Date(iso + 'T00:00:00'))
}

export function formatMonthDay(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export function getDayOfWeek(iso: string): string {
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' })
    .format(new Date(iso + 'T00:00:00'))
}

export function getDayNumber(iso: string): number {
  return new Date(iso + 'T00:00:00').getDate()
}

export function getTodayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function getDDayLabel(startDateIso: string): string {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(startDateIso + 'T00:00:00')
  const diff = Math.round((start.getTime() - today.getTime()) / 86400000)
  if (diff > 0) return `D-${diff}`
  if (diff === 0) return 'D-Day'
  return `D+${Math.abs(diff)}`
}

export function getTripDuration(startIso: string, endIso: string): number {
  const start = new Date(startIso + 'T00:00:00')
  const end = new Date(endIso + 'T00:00:00')
  return Math.round((end.getTime() - start.getTime()) / 86400000)
}

// ─── Time helpers ─────────────────────────────────────────────────────────────

/** Format "HH:MM" → "8:55 AM" */
export function formatTime(hhmm: string | null): string {
  if (!hhmm) return ''
  const [h, m] = hhmm.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}

/** Display time with timezone for transport legs only */
export function formatTransportTime(isoDatetime: string, timezone: string | null): string {
  const date = new Date(isoDatetime)
  if (!timezone) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
  }).format(date)
}

// ─── Reservation status ───────────────────────────────────────────────────────

export const RESERVATION_STATUS_CONFIG: Record<
  ReservationStatus,
  { label: string; color: string; bgColor: string; timelineColor: string }
> = {
  needed:       { label: 'Needed',      color: '#7A4F00', bgColor: '#FEF6E4', timelineColor: '#E8B86D' },
  booked:       { label: 'Booked',      color: '#276127', bgColor: '#EDF7ED', timelineColor: '#A8D4A0' },
  rush_attempt: { label: 'Rush',        color: '#C0392B', bgColor: '#FEEDED', timelineColor: '#F0A090' },
  walk_in:      { label: 'Walk-in',     color: '#5C5550', bgColor: '#F5F2EC', timelineColor: '#C8C3BC' },
  done:         { label: 'Done',        color: '#276127', bgColor: '#EDF7ED', timelineColor: '#A8D4A0' },
}

// ─── Event category ───────────────────────────────────────────────────────────

export const EVENT_CATEGORY_ICON: Record<string, string> = {
  activity: 'ti-star',
  meal:     'ti-tools-kitchen-2',
  transit:  'ti-plane',
  leisure:  'ti-walk',
  special:  'ti-sparkles',
}

// ─── Priority ─────────────────────────────────────────────────────────────────

export const PRIORITY_CONFIG: Record<EventPriority, { label: string; indicator: string }> = {
  must_do: { label: 'Must-do', indicator: '!' },
  high:    { label: 'High',    indicator: '↑' },
  medium:  { label: 'Medium',  indicator: '·' },
  low:     { label: 'Low',     indicator: '·' },
}

// ─── Currency ─────────────────────────────────────────────────────────────────

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount))
}

// ─── Progress ────────────────────────────────────────────────────────────────

export function calcProgress(done: number, total: number): number {
  if (total === 0) return 0
  return Math.round((done / total) * 100)
}

// ─── Timeline line color ─────────────────────────────────────────────────────

export function getTimelineLineColor(
  category: string,
  reservationStatus?: ReservationStatus | null,
): string {
  if (category === 'special') return '#F0C040'  // sunset / special
  if (reservationStatus) {
    return RESERVATION_STATUS_CONFIG[reservationStatus]?.timelineColor ?? '#C8C3BC'
  }
  return '#C8C3BC'
}
