// Supabase write operations — called after Zustand store update
// Pattern: update store first (instant UI), then persist to DB in background
// If DB write fails, store state is already updated — user sees no interruption

import { getSupabase } from '@/lib/supabase/client'

// ── Checklist ─────────────────────────────────────────────────────────────────

export async function dbToggleChecklistItem(
  id: string,
  isChecked: boolean,
  checkedBy: string | null
): Promise<void> {
  const { error } = await getSupabase()
    .from('checklist_items')
    .update({ is_checked: isChecked, checked_by: checkedBy })
    .eq('id', id)

  if (error) {
    console.warn('[db] checklist toggle failed — local state preserved', error)
  }
}

// ── Reservations ──────────────────────────────────────────────────────────────

export async function dbUpdateReservationStatus(
  id: string,
  status: string,
  confirmationCode: string | null
): Promise<void> {
  const { error } = await getSupabase()
    .from('reservations')
    .update({
      status,
      confirmation_code: confirmationCode,
    })
    .eq('id', id)

  if (error) {
    console.warn('[db] reservation status update failed — local state preserved', error)
  }
}

// ── Places ────────────────────────────────────────────────────────────────────

export async function dbMarkPlaceVisited(
  id: string,
  visited: boolean,
  visitedAt: string | null
): Promise<void> {
  const { error } = await getSupabase()
    .from('places')
    .update({ visited, visited_at: visitedAt })
    .eq('id', id)

  if (error) {
    console.warn('[db] place visited update failed — local state preserved', error)
  }
}

export async function dbToggleFavorite(
  id: string,
  favorite: boolean
): Promise<void> {
  const { error } = await getSupabase()
    .from('places')
    .update({ favorite })
    .eq('id', id)

  if (error) {
    console.warn('[db] place favorite update failed — local state preserved', error)
  }
}

// ── Events ────────────────────────────────────────────────────────────────────

export async function dbReorderEvents(
  events: Array<{ id: string; sortOrder: number }>
): Promise<void> {
  // Batch update sort_order for all affected events
  const updates = events.map(({ id, sortOrder }) =>
    getSupabase()
      .from('events')
      .update({ sort_order: sortOrder })
      .eq('id', id)
  )

  const results = await Promise.all(updates)
  const failed  = results.filter(r => r.error)
  if (failed.length > 0) {
    console.warn('[db] event reorder partial failure — local state preserved')
  }
}

// ── Events CRUD ───────────────────────────────────────────────────────────────

export async function dbAddEvent(event: {
  id: string
  tripId: string
  cityId: string
  eventDate: string
  startTime: string | null
  title: string
  description: string | null
  category: string
  status: string
  priority: string
  isPinned: boolean
  sortOrder: number
  placeId: string | null
  reservationId: string | null
}): Promise<void> {
  const { error } = await getSupabase()
    .from('events')
    .insert({
      id:             event.id,
      trip_id:        event.tripId,
      city_id:        event.cityId,
      event_date:     event.eventDate,
      start_time:     event.startTime,
      title:          event.title,
      description:    event.description,
      category:       event.category,
      status:         event.status,
      priority:       event.priority,
      is_pinned:      event.isPinned,
      sort_order:     event.sortOrder,
      place_id:       event.placeId,
      reservation_id: event.reservationId,
    })

  if (error) {
    console.warn('[db] event add failed', error)
  }
}

export async function dbUpdateEvent(id: string, patch: {
  title?: string
  description?: string | null
  startTime?: string | null
  category?: string
  priority?: string
}): Promise<void> {
  const dbPatch: Record<string, unknown> = {}
  if (patch.title       !== undefined) dbPatch.title       = patch.title
  if (patch.description !== undefined) dbPatch.description = patch.description
  if (patch.startTime   !== undefined) dbPatch.start_time  = patch.startTime
  if (patch.category    !== undefined) dbPatch.category    = patch.category
  if (patch.priority    !== undefined) dbPatch.priority    = patch.priority

  const { error } = await getSupabase()
    .from('events')
    .update(dbPatch)
    .eq('id', id)

  if (error) {
    console.warn('[db] event update failed', error)
  }
}

export async function dbDeleteEvent(id: string): Promise<void> {
  const { error } = await getSupabase()
    .from('events')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    console.warn('[db] event delete failed', error)
  }
}
