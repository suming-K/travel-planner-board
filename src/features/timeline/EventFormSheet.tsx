'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { dbAddEvent, dbUpdateEvent, dbDeleteEvent } from '@/lib/supabase/writes'
import type { TripEvent, City, EventCategory, EventPriority } from '@/lib/types'

const CATEGORIES: { value: EventCategory; label: string; icon: string }[] = [
  { value: 'activity', label: 'Activity',  icon: 'ti-star' },
  { value: 'meal',     label: 'Meal',      icon: 'ti-tools-kitchen-2' },
  { value: 'transit',  label: 'Transit',   icon: 'ti-plane' },
  { value: 'leisure',  label: 'Leisure',   icon: 'ti-walk' },
  { value: 'special',  label: 'Special',   icon: 'ti-sparkles' },
]

const PRIORITIES: { value: EventPriority; label: string }[] = [
  { value: 'must_do', label: 'Must-do' },
  { value: 'high',    label: 'High' },
  { value: 'medium',  label: 'Medium' },
  { value: 'low',     label: 'Low' },
]

interface EventFormSheetProps {
  mode: 'add' | 'edit'
  event?: TripEvent
  selectedDate: string
  cities: City[]
  onClose: () => void
}

export function EventFormSheet({
  mode,
  event,
  selectedDate,
  cities,
  onClose,
}: EventFormSheetProps): JSX.Element {
  const addEvent    = useAppStore(s => s.addEvent)
  const updateEvent = useAppStore(s => s.updateEvent)
  const deleteEvent = useAppStore(s => s.deleteEvent)
  const allEvents   = useAppStore(s => s.events ?? [])

  const [title,       setTitle]       = useState(event?.title       ?? '')
  const [description, setDescription] = useState(event?.description ?? '')
  const [startTime,   setStartTime]   = useState(event?.startTime   ?? '')
  const [category,    setCategory]    = useState<EventCategory>(event?.category ?? 'activity')
  const [priority,    setPriority]    = useState<EventPriority>(event?.priority ?? 'medium')
  const [saving,      setSaving]      = useState(false)
  const [deleting,    setDeleting]    = useState(false)
  const [confirmDel,  setConfirmDel]  = useState(false)

  // Best-guess city for the selected date
  const cityId = cities.find(c =>
    c.arriveDate <= selectedDate && c.departDate >= selectedDate
  )?.id ?? cities[0]?.id ?? ''

  async function handleSave() {
    if (!title.trim()) return
    setSaving(true)

    if (mode === 'add') {
      const id = `ev-${Date.now()}`
      const maxOrder = Math.max(
        0,
        ...allEvents
          .filter(e => e.eventDate === selectedDate && !e.deletedAt)
          .map(e => e.sortOrder)
      )
      const newEvent: TripEvent = {
        id,
        tripId:        'trip-ny-2026',
        cityId,
        eventDate:     selectedDate,
        startTime:     startTime.trim() || null,
        title:         title.trim(),
        description:   description.trim() || null,
        category,
        status:        'upcoming',
        priority,
        isPinned:      false,
        sortOrder:     maxOrder + 1,
        placeId:       null,
        reservationId: null,
        deletedAt:     null,
      }
      // Optimistic update
      addEvent(newEvent)
      // DB write
      void dbAddEvent({
        id:            newEvent.id,
        tripId:        newEvent.tripId,
        cityId:        newEvent.cityId,
        eventDate:     newEvent.eventDate,
        startTime:     newEvent.startTime,
        title:         newEvent.title,
        description:   newEvent.description,
        category:      newEvent.category,
        status:        newEvent.status,
        priority:      newEvent.priority,
        isPinned:      newEvent.isPinned,
        sortOrder:     newEvent.sortOrder,
        placeId:       newEvent.placeId,
        reservationId: newEvent.reservationId,
      })
    } else if (event) {
      const patch = {
        title:       title.trim(),
        description: description.trim() || null,
        startTime:   startTime.trim() || null,
        category,
        priority,
      }
      // Optimistic update
      updateEvent(event.id, patch)
      // DB write
      void dbUpdateEvent(event.id, patch)
    }

    setSaving(false)
    onClose()
  }

  async function handleDelete() {
    if (!event) return
    setDeleting(true)
    // Optimistic update
    deleteEvent(event.id)
    // DB write
    void dbDeleteEvent(event.id)
    setDeleting(false)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      style={{ background: 'rgba(0,0,0,0.35)' }}
      onClick={onClose}
    >
      <div
        className="w-full bg-white rounded-t-[20px] pt-1 pb-8 max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-[36px] h-[4px] bg-[#E8E4DE] rounded-full mx-auto mt-2 mb-4" />

        {/* Header */}
        <div className="flex justify-between items-center px-4 mb-4">
          <p className="text-[13px] font-bold text-[#1A1714]">
            {mode === 'add' ? 'New event' : 'Edit event'}
          </p>
          {mode === 'edit' && !confirmDel && (
            <button
              onClick={() => setConfirmDel(true)}
              className="text-[11px] text-[#C0392B] bg-transparent border-none cursor-pointer"
            >
              Delete
            </button>
          )}
          {confirmDel && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setConfirmDel(false)}
                className="text-[11px] text-[#B0AAA3] bg-transparent border-none cursor-pointer"
              >Cancel</button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-[11px] font-semibold text-white bg-[#C0392B] rounded-[7px] px-[10px] py-[4px] border-none cursor-pointer"
              >
                {deleting ? 'Deleting…' : 'Confirm delete'}
              </button>
            </div>
          )}
        </div>

        <div className="px-4 flex flex-col gap-[14px]">
          {/* Title */}
          <div>
            <label className="text-[9px] font-semibold text-[#B0AAA3] tracking-[0.06em] uppercase block mb-[5px]">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Event title"
              className="w-full text-[13px] text-[#1A1714] bg-[#F5F2EC] rounded-[9px] px-[12px] py-[10px] border-none outline-none"
            />
          </div>

          {/* Time */}
          <div>
            <label className="text-[9px] font-semibold text-[#B0AAA3] tracking-[0.06em] uppercase block mb-[5px]">
              Time (optional — leave blank for free order)
            </label>
            <input
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className="w-full text-[13px] text-[#1A1714] bg-[#F5F2EC] rounded-[9px] px-[12px] py-[10px] border-none outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-[9px] font-semibold text-[#B0AAA3] tracking-[0.06em] uppercase block mb-[5px]">
              Category
            </label>
            <div className="flex gap-[6px] flex-wrap">
              {CATEGORIES.map(c => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={`flex items-center gap-[4px] text-[10px] font-semibold px-[9px] py-[5px] rounded-full border-none cursor-pointer transition-colors ${
                    category === c.value
                      ? 'bg-[#1A1714] text-white'
                      : 'bg-[#F5F2EC] text-[#5C5550]'
                  }`}
                >
                  <i className={`ti ${c.icon} text-[10px]`} aria-hidden="true" />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="text-[9px] font-semibold text-[#B0AAA3] tracking-[0.06em] uppercase block mb-[5px]">
              Priority
            </label>
            <div className="flex gap-[6px]">
              {PRIORITIES.map(p => (
                <button
                  key={p.value}
                  onClick={() => setPriority(p.value)}
                  className={`text-[10px] font-semibold px-[9px] py-[5px] rounded-full border-none cursor-pointer transition-colors ${
                    priority === p.value
                      ? 'bg-[#1A1714] text-white'
                      : 'bg-[#F5F2EC] text-[#5C5550]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-[9px] font-semibold text-[#B0AAA3] tracking-[0.06em] uppercase block mb-[5px]">
              Notes (optional)
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Notes, address, details…"
              rows={2}
              className="w-full text-[12px] text-[#1A1714] bg-[#F5F2EC] rounded-[9px] px-[12px] py-[10px] border-none outline-none resize-none"
            />
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="w-full bg-[#1A1714] text-white text-[12px] font-semibold rounded-[10px] py-[12px] border-none cursor-pointer disabled:opacity-40 transition-opacity"
          >
            {saving ? 'Saving…' : mode === 'add' ? 'Add event' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
