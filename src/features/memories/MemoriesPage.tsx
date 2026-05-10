'use client'

import { useAppStore } from '@/lib/store'
import { formatDateShort } from '@/lib/utils'

export function MemoriesPage(): JSX.Element {
  // Raw selectors with ?? fallbacks
  const memories = useAppStore(s => s.memories ?? [])
  const dayMetas = useAppStore(s => s.dayMetas ?? [])
  const events   = useAppStore(s => s.events   ?? [])

  // Derive event dates inline — no selector function call
  const dates = [...new Set(
    events.filter(e => !e.deletedAt).map(e => e.eventDate)
  )].sort()

  // Merge memories and day metas by date
  const days = dates
    .map(date => ({
      date,
      meta:   dayMetas.find(m => m.date === date)   ?? null,
      memory: memories.find(m => m.memoryDate === date) ?? null,
    }))
    .filter(d => d.memory !== null || d.meta?.dayNote != null)

  return (
    <div className="bg-[#FAFAF8] min-h-screen flex flex-col">
      <header className="bg-white border-b border-[#EDEAE4] px-4 pt-[56px] pb-3">
        <h1 className="text-[18px] font-bold text-[#1A1714] tracking-[-0.03em]">Memories</h1>
        <p className="text-[10px] text-[#B0AAA3] mt-[2px]">Songs & notes from each day</p>
      </header>

      <main className="flex-1 px-4 pt-3 pb-6">
        {days.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <i className="ti ti-music-off text-[28px] text-[#E8E4DE] mb-2" aria-hidden="true" />
            <p className="text-[12px] text-[#B0AAA3]">No memories yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-[2px] rounded-[14px] overflow-hidden border border-[#EDEAE4] bg-white">
            {days.map((day, idx) => {
              const isLast = idx === days.length - 1
              return (
                <div
                  key={day.date}
                  className={`px-[14px] py-[11px] ${!isLast ? 'border-b border-[#EDEAE4]' : ''}`}
                >
                  <p className="text-[10px] text-[#B0AAA3] mb-[5px]">
                    {formatDateShort(day.date)}
                  </p>
                  {day.meta?.dayNote && (
                    <p className="text-[11px] text-[#5C5550] mb-[5px] leading-[1.4]">
                      {day.meta.dayNote}
                    </p>
                  )}
                  {day.memory && (
                    <div className="flex items-center gap-[6px]">
                      <i className="ti ti-music text-[11px] flex-shrink-0" style={{ color: '#D4A017' }} aria-hidden="true" />
                      <p className="text-[11px]" style={{ color: '#8A6800' }}>
                        {day.memory.songArtist} · {day.memory.songTitle}
                      </p>
                    </div>
                  )}
                  {day.memory?.note && (
                    <p className="text-[10px] text-[#B0AAA3] mt-[3px] pl-[17px]">
                      {day.memory.note}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
