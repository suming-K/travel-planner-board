'use client'

import { useAppStore } from '@/lib/store'
import { DateStrip } from '@/features/timeline/DateStrip'
import { SortableEventList } from '@/features/timeline/SortableEventList'
import { getTodayIso, formatDateShort } from '@/lib/utils'

interface TimelinePageProps { tripId: string }

export function TimelinePage({ tripId: _tripId }: TimelinePageProps): JSX.Element {
  // Raw selectors with ?? fallbacks — never call store functions inside selector
  const selectedDate    = useAppStore(s => s.selectedDate    ?? getTodayIso())
  const setSelectedDate = useAppStore(s => s.setSelectedDate)
  const reorderEvents   = useAppStore(s => s.reorderEvents)
  const events          = useAppStore(s => s.events          ?? [])
  const memories        = useAppStore(s => s.memories        ?? [])
  const places          = useAppStore(s => s.places          ?? [])
  const reservations    = useAppStore(s => s.reservations    ?? [])
  const cities          = useAppStore(s => s.cities          ?? [])
  const dayMetas        = useAppStore(s => s.dayMetas        ?? [])

  // Derive all computed values inline — no selector-level function calls
  const dates = [...new Set(
    events.filter(e => !e.deletedAt).map(e => e.eventDate)
  )].sort()

  const dayEvents = events
    .filter(e => e.eventDate === selectedDate && !e.deletedAt)
    .sort((a, b) =>
      !a.startTime ? 1 : !b.startTime ? -1 : a.startTime.localeCompare(b.startTime)
    )

  const meta   = dayMetas.find(m => m.date === selectedDate) ?? null
  const today  = getTodayIso()
  const memory = memories.find(m => m.memoryDate === selectedDate) ?? null

  const cityId = dayEvents[0]?.cityId ?? ''
  const city   = cities.find(c => c.id === cityId)?.name ?? ''

  return (
    <div className="bg-[#FAFAF8] min-h-screen flex flex-col">
      <header className="bg-white border-b border-[#EDEAE4] px-4 pt-[56px] pb-3 sticky top-0 z-10">
        <div className="flex justify-between items-center mb-[14px]">
          <h1 className="text-[18px] font-bold text-[#1A1714] tracking-[-0.03em]">May Timeline</h1>
          <button
            className="flex items-center gap-[3px] text-[10px] font-semibold bg-[#F5F2EC] text-[#1A1714] rounded-[7px] px-[9px] py-[4px] border-none cursor-pointer hover:bg-[#EDEAE4] transition-colors"
            onClick={() => setSelectedDate(today)}
          >
            <i className="ti ti-calendar-event text-[11px]" aria-hidden="true" /> Today
          </button>
        </div>
        <DateStrip dates={dates} />
      </header>

      <main className="flex-1 px-4 pt-3 pb-6 flex flex-col gap-[9px]">
        <div className="flex justify-between items-baseline">
          <p className="text-[10px] text-[#B0AAA3]">
            {selectedDate ? formatDateShort(selectedDate) : '—'}{city ? ` · ${city}` : ''}
          </p>
          {meta?.sunset && (
            <p className="text-[10px]" style={{ color: '#9A7200' }}>
              <i className="ti ti-sunset text-[10px] mr-[2px]" aria-hidden="true" />
              Sunset {meta.sunset}
            </p>
          )}
        </div>

        {dayEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <i className="ti ti-calendar-off text-[28px] text-[#E8E4DE] mb-2" aria-hidden="true" />
            <p className="text-[12px] text-[#B0AAA3]">No events on this day</p>
          </div>
        ) : (
          <SortableEventList
            events={dayEvents}
            places={places}
            reservations={reservations}
            selectedDate={selectedDate}
            onReorder={reorderEvents}
          />
        )}

        {meta?.dayNote && (
          <p className="text-[10px] text-[#B0AAA3] text-center">{meta.dayNote}</p>
        )}

        {memory && (
          <div
            className="rounded-[9px] py-[8px] px-[11px] flex items-center gap-[7px]"
            style={{ background: '#FDFAF2', border: '.5px solid rgba(212,160,23,.15)' }}
          >
            <i className="ti ti-music text-[12px]" style={{ color: '#D4A017' }} aria-hidden="true" />
            <p className="text-[11px]" style={{ color: '#8A6800' }}>
              {memory.songArtist} · {memory.songTitle}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
