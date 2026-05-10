'use client'

import { useAppStore } from '@/lib/store'
import { useTripData } from '@/hooks/useTripData'
import { ReminderBanner } from '@/features/dashboard/ReminderBanner'
import { TodayCard } from '@/features/dashboard/TodayCard'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { getDDayLabel, formatDateShort } from '@/lib/utils'
import { UserMenu } from '@/components/layout/UserMenu'

interface DashboardPageProps { tripId: string }

export function DashboardPage({ tripId }: DashboardPageProps) {
  useTripData()  // fetch DB → store, seed data pre-loaded so never blocks

  const trip      = useAppStore(s => s.activeTrip)
  const cities    = useAppStore(s => s.cities ?? [])
  const selectedDate = useAppStore(s => s.selectedDate ?? '')
  const reservations   = useAppStore(s => s.reservations ?? [])
  const checklistItems = useAppStore(s => s.checklistItems ?? [])
  const resDone  = reservations.filter(r => !r.deletedAt && (r.status === 'booked' || r.status === 'done')).length
  const resTotal = reservations.filter(r => !r.deletedAt).length
  const clDone   = checklistItems.filter(i => i.isChecked).length
  const clTotal  = checklistItems.length
  const resProg  = { done: resDone, total: resTotal, pct: resTotal > 0 ? Math.round(resDone / resTotal * 100) : 0 }
  const clProg   = { done: clDone, total: clTotal, pct: clTotal > 0 ? Math.round(clDone / clTotal * 100) : 0 }

  // trip is always populated from seed data on first render
  // If somehow still null, use safe fallbacks below

  const dday = trip ? getDDayLabel(trip.startDate) : 'D-?'
  const today = selectedDate ? formatDateShort(selectedDate) : ''

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-[#EDEAE4] px-[18px] pt-[60px] pb-[14px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] text-[#B0AAA3] tracking-[0.07em] font-medium mb-[4px] uppercase">
              NY · BOS · NIAGARA
            </p>
            <h1 className="text-[20px] font-bold text-[#1A1714] tracking-[-0.035em] leading-[1.08]">
              Today in Brooklyn
            </h1>
            <p className="text-[11px] text-[#B0AAA3] mt-[3px]">{today}</p>
          </div>
          <div className="flex flex-col items-end gap-[6px] mt-[2px]">
            <span className="bg-[#1A1714] text-[#FAFAF8] text-[11px] font-bold px-[11px] py-[4px] rounded-full tracking-[0.01em]">
              {dday}
            </span>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="px-[16px] pt-[12px] pb-[24px]">
        <ReminderBanner />
        <TodayCard tripId={tripId} />

        {/* Progress */}
        <div className="grid grid-cols-2 gap-[7px] mb-[11px]">
          <div className="bg-white border border-[#EDEAE4] rounded-[12px] p-[11px_13px]">
            <p className="text-[9px] text-[#B0AAA3] font-medium tracking-[0.03em] mb-[5px] uppercase">Reservations</p>
            <div className="flex items-baseline gap-[2px] mb-[7px]">
              <span className="text-[20px] font-bold text-[#1A1714] tracking-[-0.03em] leading-none">{resProg.done}</span>
              <span className="text-[10px] text-[#C8C3BC]">/{resProg.total}</span>
            </div>
            <ProgressBar value={resProg.pct} color="#276127" />
          </div>
          <div className="bg-white border border-[#EDEAE4] rounded-[12px] p-[11px_13px]">
            <p className="text-[9px] text-[#B0AAA3] font-medium tracking-[0.03em] mb-[5px] uppercase">Checklist</p>
            <div className="flex items-baseline gap-[2px] mb-[7px]">
              <span className="text-[20px] font-bold text-[#1A1714] tracking-[-0.03em] leading-none">{clProg.done}</span>
              <span className="text-[10px] text-[#C8C3BC]">/{clProg.total}</span>
            </div>
            <ProgressBar value={clProg.pct} color="#D4A017" />
          </div>
        </div>

        {/* City strip */}
        <div className="flex gap-[5px] overflow-x-auto pb-[2px] scrollbar-hide">
          {cities.map((city, i) => {
            const isActive = i === 0
            return (
              <div
                key={city.id}
                className={`flex-shrink-0 rounded-[8px] px-[10px] py-[6px] ${isActive ? 'border-[1.5px] border-[#1A1714]' : 'border-[0.5px] border-[#EDEAE4]'}`}
              >
                <p className="text-[9px] text-[#B0AAA3] mb-[1px]">{city.name}</p>
                <p className={`text-[11px] ${isActive ? 'font-bold text-[#1A1714]' : 'font-medium text-[#8A8480]'}`}>
                  {city.arriveDate.slice(5).replace('-', '/')}&ndash;{city.departDate.slice(5).replace('-', '/')}
                </p>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
