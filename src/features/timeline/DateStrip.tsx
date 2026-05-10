'use client'

import { useRef, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { getDayOfWeek, getDayNumber, getTodayIso } from '@/lib/utils'

interface DateStripProps {
  dates: string[]
}

export function DateStrip({ dates }: DateStripProps) {
  const selectedDate = useAppStore(s => s.selectedDate ?? '')
  const setSelectedDate = useAppStore(s => s.setSelectedDate)
  const stripRef = useRef<HTMLDivElement>(null)
  const today = getTodayIso()

  // Scroll active date into view
  useEffect(() => {
    const activeEl = stripRef.current?.querySelector('[data-active="true"]')
    activeEl?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' })
  }, [selectedDate])

  if (dates.length === 0) return null

  return (
    <div
      ref={stripRef}
      className="flex gap-[4px] overflow-x-auto pb-[2px] scrollbar-hide"
      role="tablist"
      aria-label="Select date"
    >
      {dates.map((date) => {
        const isActive = date === selectedDate
        const isToday = date === today

        return (
          <button
            key={date}
            data-active={isActive}
            role="tab"
            aria-selected={isActive}
            onClick={() => setSelectedDate(date)}
            className={`
              flex flex-col items-center px-[9px] py-[6px] rounded-[8px] min-w-[36px]
              flex-shrink-0 border-none cursor-pointer transition-colors
              ${isActive
                ? 'bg-[#1A1714]'
                : 'bg-[#F5F2EC] hover:bg-[#EDEAE4]'}
            `}
          >
            <span className={`text-[8px] font-medium leading-none mb-[2px] ${isActive ? 'text-[#8A7860]' : 'text-[#C0BAB2]'}`}>
              {getDayOfWeek(date).toUpperCase()}
            </span>
            <span className={`text-[13px] leading-none ${isActive ? 'text-white font-bold' : 'text-[#8A8480] font-medium'}`}>
              {getDayNumber(date)}
            </span>
            {isToday && !isActive && (
              <span className="w-[3px] h-[3px] rounded-full bg-[#D4A017] mt-[2px]" aria-label="today" />
            )}
          </button>
        )
      })}
    </div>
  )
}
