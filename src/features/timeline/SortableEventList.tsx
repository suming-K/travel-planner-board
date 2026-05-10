'use client'

import { dbReorderEvents } from '@/lib/supabase/writes'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { TripEvent, Place, Reservation } from '@/lib/types'
import { EventCard } from '@/features/timeline/EventCard'

// ─── Sortable item ────────────────────────────────────────────────────────────

interface SortableItemProps {
  event: TripEvent
  place: Place | null | undefined
  reservation: Reservation | null | undefined
  isLast: boolean
  isDraggable: boolean
  onEdit: (event: TripEvent) => void
}

function SortableItem({ event, place, reservation, isLast, isDraggable, onEdit }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: event.id, disabled: !isDraggable })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    zIndex: isDragging ? 10 : ('auto' as const),
  }

  return (
    <div ref={setNodeRef} style={style}>
      {/* Drag handle — only for free (no startTime) events */}
      {isDraggable && (
        <button
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          aria-label={`Drag to reorder ${event.title}`}
          className="absolute left-0 top-0 bottom-0 w-[14px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none z-10"
          style={{ outline: 'none' }}
        >
          <span className="flex flex-col gap-[2px]">
            <span className="block w-[3px] h-[3px] rounded-full bg-[#D0CCC6]" />
            <span className="block w-[3px] h-[3px] rounded-full bg-[#D0CCC6]" />
            <span className="block w-[3px] h-[3px] rounded-full bg-[#D0CCC6]" />
          </span>
        </button>
      )}

      <div className={isDraggable ? 'pl-[10px]' : ''}>
        <EventCard
          event={event}
          place={place}
          reservation={reservation}
          isLast={isLast}
          onEdit={() => onEdit(event)}
        />
      </div>
    </div>
  )
}

// ─── Main list ────────────────────────────────────────────────────────────────

interface SortableEventListProps {
  events: TripEvent[]
  places: Place[]
  reservations: Reservation[]
  selectedDate: string
  onReorder: (date: string, fromIdx: number, toIdx: number) => void
  onEdit: (event: TripEvent) => void
}

export function SortableEventList({
  events,
  places,
  reservations,
  selectedDate,
  onReorder,
  onEdit,
}: SortableEventListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
  )

  // Only free events (no startTime) are draggable
  const freeEvents = events.filter(e => !e.startTime)

  function handleDragEnd(dragEvent: DragEndEvent) {
    const { active, over } = dragEvent
    if (!over || active.id === over.id) return

    // Indexes within the full events array (which includes timed events at top)
    const oldIdx = events.findIndex(e => e.id === active.id)
    const newIdx  = events.findIndex(e => e.id === over.id)
    if (oldIdx === -1 || newIdx === -1) return

    // Only allow drop onto other free events
    const overEvent = events[newIdx]
    if (overEvent.startTime) return

    // Optimistic store update
    onReorder(selectedDate, oldIdx, newIdx)

    // Persist to DB — only free events change sortOrder
    const reordered = [...events]
    const [moved] = reordered.splice(oldIdx, 1)
    reordered.splice(newIdx, 0, moved)
    void dbReorderEvents(
      reordered
        .filter(e => !e.startTime)
        .map((e, i) => ({ id: e.id, sortOrder: i }))
    )
  }

  const ids = events.map(e => e.id)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="bg-white rounded-[14px] border border-[#EDEAE4] overflow-hidden">
          {events.map((event, idx) => {
            const place = event.placeId
              ? places.find(p => p.id === event.placeId) ?? null
              : null
            const reservation = event.reservationId
              ? reservations.find(r => r.id === event.reservationId) ?? null
              : null
            return (
              <SortableItem
                key={event.id}
                event={event}
                place={place}
                reservation={reservation}
                isLast={idx === events.length - 1}
                isDraggable={!event.startTime}
                onEdit={onEdit}
              />
            )
          })}
        </div>
      </SortableContext>
    </DndContext>
  )
}
