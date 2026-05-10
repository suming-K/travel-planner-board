'use client'

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

// ─── Sortable wrapper for a single EventCard ──────────────────────────────────

interface SortableItemProps {
  event: TripEvent
  place: Place | null | undefined
  reservation: Reservation | null | undefined
  isLast: boolean
}

function SortableItem({ event, place, reservation, isLast }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: event.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    zIndex: isDragging ? 10 : 'auto' as const,
  }

  return (
    <div ref={setNodeRef} style={style}>
      {/* Drag handle — sits in the left gutter, non-intrusive */}
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

      {/* Existing EventCard — completely unchanged */}
      <div className="pl-[10px]">
        <EventCard
          event={event}
          place={place}
          reservation={reservation}
          isLast={isLast}
        />
      </div>
    </div>
  )
}

// ─── Main sortable list ───────────────────────────────────────────────────────

interface SortableEventListProps {
  events: TripEvent[]
  places: Place[]
  reservations: Reservation[]
  selectedDate: string
  onReorder: (date: string, fromIdx: number, toIdx: number) => void
}

export function SortableEventList({
  events,
  places,
  reservations,
  selectedDate,
  onReorder,
}: SortableEventListProps) {
  // Mobile-optimised sensors:
  // - PointerSensor with 8px activation distance (avoids accidental drag on tap)
  // - TouchSensor with delay (iOS friendly)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 6 },
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIdx = events.findIndex(e => e.id === active.id)
    const newIdx = events.findIndex(e => e.id === over.id)
    if (oldIdx === -1 || newIdx === -1) return

    // Call existing store action — no new state needed
    onReorder(selectedDate, oldIdx, newIdx)
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
            const place       = event.placeId       ? places.find(p => p.id === event.placeId) ?? null       : null
            const reservation = event.reservationId ? reservations.find(r => r.id === event.reservationId) ?? null : null
            return (
              <SortableItem
                key={event.id}
                event={event}
                place={place}
                reservation={reservation}
                isLast={idx === events.length - 1}
              />
            )
          })}
        </div>
      </SortableContext>
    </DndContext>
  )
}
