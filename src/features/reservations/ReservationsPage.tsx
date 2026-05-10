'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { RESERVATION_STATUS_CONFIG } from '@/lib/utils'
import type { Reservation, ReservationStatus } from '@/lib/types'

const FILTERS: { key: ReservationStatus | 'all'; label: string }[] = [
  { key: 'all',          label: 'All' },
  { key: 'needed',       label: 'Needed' },
  { key: 'booked',       label: 'Booked' },
  { key: 'rush_attempt', label: 'Rush' },
  { key: 'walk_in',      label: 'Walk-in' },
]

const CATEGORY_ICON: Record<string, string> = {
  activity:  'ti-star',
  meal:      'ti-tools-kitchen-2',
  transport: 'ti-plane',
}

export function ReservationsPage() {
  const reservations        = useAppStore(s => s.reservations ?? [])
  const filter              = useAppStore(s => s.reservationFilter)
  const setFilter           = useAppStore(s => s.setReservationFilter)
  const updateStatus        = useAppStore(s => s.updateReservationStatus)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [sheetId, setSheetId]   = useState<string | null>(null)

  const active = reservations.filter(r => !r.deletedAt)
  const shown  = filter === 'all' ? active : active.filter(r => r.status === filter)

  // Group by date
  const grouped = shown.reduce<Record<string, Reservation[]>>((acc, r) => {
    const key = r.reservationDate ?? 'TBD'
    if (!acc[key]) acc[key] = []
    acc[key].push(r)
    return acc
  }, {})

  const sortedDates = Object.keys(grouped).sort()

  const copyCode = (id: string, code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {})
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1800)
  }

  const allRes  = useAppStore(s => s.reservations ?? [])
  const resDone = allRes.filter(r => !r.deletedAt && (r.status === 'booked' || r.status === 'done')).length
  const resTotal = allRes.filter(r => !r.deletedAt).length
  const prog = { done: resDone, total: resTotal, pct: resTotal > 0 ? Math.round(resDone / resTotal * 100) : 0 }

  return (
    <div className="bg-[#FAFAF8] min-h-screen flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-[#EDEAE4] px-4 pt-[56px] pb-3 sticky top-0 z-10">
        <div className="flex justify-between items-baseline mb-3">
          <h1 className="text-[18px] font-bold text-[#1A1714] tracking-[-0.03em]">Bookings</h1>
          <span className="text-[10px] text-[#B0AAA3]">
            {prog.done}/{prog.total} confirmed
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] bg-[#EDEAE4] rounded-full mb-3">
          <div
            className="h-[2px] bg-[#276127] rounded-full transition-all duration-500"
            style={{ width: `${prog.pct}%` }}
          />
        </div>

        {/* Filter pills */}
        <div className="flex gap-[5px] overflow-x-auto pb-1 scrollbar-hide">
          {FILTERS.map(f => {
            const active = filter === f.key
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`flex-shrink-0 text-[10px] font-semibold px-[9px] py-[3px] rounded-full border-none cursor-pointer transition-colors ${
                  active
                    ? 'bg-[#1A1714] text-white'
                    : 'bg-[#F5F2EC] text-[#5C5550] hover:bg-[#EDEAE4]'
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </header>

      {/* List */}
      <main className="flex-1 px-4 pt-3 pb-6 flex flex-col gap-4">
        {sortedDates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <i className="ti ti-bookmark-off text-[28px] text-[#E8E4DE] mb-2" aria-hidden="true" />
            <p className="text-[12px] text-[#B0AAA3]">No reservations in this category</p>
          </div>
        )}

        {sortedDates.map(date => (
          <div key={date}>
            {/* Date group label */}
            <p className="text-[9px] font-semibold text-[#B0AAA3] tracking-[0.06em] uppercase mb-[6px]">
              {date === 'TBD' ? 'TBD' : formatGroupDate(date)}
            </p>

            <div className="flex flex-col gap-[1px] rounded-[14px] overflow-hidden border border-[#EDEAE4] bg-white">
              {grouped[date].map((res, idx) => {
                const isLast = idx === grouped[date].length - 1
                const cfg    = RESERVATION_STATUS_CONFIG[res.status]
                const icon   = CATEGORY_ICON[res.category] ?? 'ti-ticket'

                return (
                  <div
                    key={res.id}
                    className={`flex gap-3 px-[14px] py-[11px] items-start ${!isLast ? 'border-b border-[#EDEAE4]' : ''}`}
                  >
                    {/* Left accent bar */}
                    <div
                      className="w-[2.5px] self-stretch rounded-[2px] flex-shrink-0 mt-[1px]"
                      style={{ background: cfg.timelineColor }}
                      aria-hidden="true"
                    />

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-[4px]">
                        <p className="text-[12px] font-semibold text-[#1A1714] leading-[1.3]">
                          {res.title}
                        </p>
                        <span
                          className="flex-shrink-0 text-[10px] font-medium px-[7px] py-[2px] rounded-[10px]"
                          style={{ color: cfg.color, background: cfg.bgColor }}
                        >
                          {cfg.label}
                        </span>
                      </div>

                      {/* Time + notes */}
                      {res.reservationTime && (
                        <p className="text-[10px] text-[#B0AAA3] mb-[3px]">
                          <i className="ti ti-clock text-[10px] mr-[3px]" aria-hidden="true" />
                          {res.reservationTime}
                        </p>
                      )}
                      {res.notes && (
                        <p className="text-[10px] text-[#B0AAA3] leading-[1.4] mb-[4px]">
                          {res.notes}
                        </p>
                      )}

                      {/* Confirmation code */}
                      {res.confirmationCode && (
                        <button
                          className="flex items-center gap-[5px] bg-[#F5F2EC] rounded-[6px] px-[8px] py-[3px] border-none cursor-pointer hover:bg-[#EDEAE4] transition-colors mt-[2px]"
                          onClick={() => { const code = res.confirmationCode; if (code) copyCode(res.id, code) }}
                          aria-label={`Copy confirmation code ${res.confirmationCode}`}
                        >
                          <span className="font-mono text-[10px] tracking-[0.06em] text-[#5C5550] font-semibold">
                            {res.confirmationCode}
                          </span>
                          <i
                            className={`ti ${copiedId === res.id ? 'ti-check' : 'ti-copy'} text-[10px] text-[#B0AAA3]`}
                            aria-hidden="true"
                          />
                        </button>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-[5px] flex-shrink-0 items-end">
                      {res.bookingUrl && res.status === 'needed' && (
                        <a
                          href={res.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-semibold bg-[#1A1714] text-white rounded-[7px] px-[8px] py-[4px] no-underline"
                        >
                          Book
                        </a>
                      )}
                      <button
                        className="text-[10px] text-[#B0AAA3] bg-transparent border-none cursor-pointer p-0 hover:text-[#5C5550]"
                        onClick={() => setSheetId(res.id)}
                        aria-label="Update status"
                      >
                        <i className="ti ti-dots text-[14px]" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </main>

      {/* Status sheet overlay */}
      {sheetId && (
        <StatusSheet
          reservation={active.find(r => r.id === sheetId)!}
          onClose={() => setSheetId(null)}
          onUpdate={(status, code) => {
            updateStatus(sheetId, status, code)
            setSheetId(null)
          }}
        />
      )}
    </div>
  )
}

// ── Status bottom sheet ───────────────────────────────────────────────────────

const STATUS_OPTIONS: { status: ReservationStatus; label: string; sub: string }[] = [
  { status: 'needed',       label: 'Needed',       sub: 'Not yet reserved' },
  { status: 'booked',       label: 'Booked',       sub: 'Confirmed — enter code' },
  { status: 'rush_attempt', label: 'Rush',         sub: 'Same-day attempt' },
  { status: 'walk_in',      label: 'Walk-in',      sub: 'No reservation needed' },
  { status: 'done',         label: 'Done',         sub: 'Completed' },
]

function StatusSheet({
  reservation,
  onClose,
  onUpdate,
}: {
  reservation: Reservation
  onClose: () => void
  onUpdate: (status: ReservationStatus, code?: string) => void
}) {
  const [selected, setSelected] = useState<ReservationStatus>(reservation.status)
  const [code, setCode] = useState(reservation.confirmationCode ?? '')

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      style={{ background: 'rgba(0,0,0,0.3)' }}
      onClick={onClose}
    >
      <div
        className="w-full bg-white rounded-t-[20px] pb-8 pt-1"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-[36px] h-[4px] bg-[#E8E4DE] rounded-full mx-auto mt-2 mb-4" />

        <p className="text-[12px] font-semibold text-[#B0AAA3] px-4 mb-3 truncate">
          {reservation.title}
        </p>

        {STATUS_OPTIONS.map(opt => {
          const cfg = RESERVATION_STATUS_CONFIG[opt.status]
          return (
            <button
              key={opt.status}
              onClick={() => setSelected(opt.status)}
              className={`w-full flex items-center gap-3 px-4 py-[10px] border-none bg-transparent cursor-pointer text-left transition-colors ${
                selected === opt.status ? 'bg-[#F5F2EC]' : 'hover:bg-[#FAFAF8]'
              }`}
            >
              <div className="w-[8px] h-[8px] rounded-full flex-shrink-0" style={{ background: cfg.timelineColor }} />
              <div className="flex-1">
                <p className="text-[12px] font-semibold text-[#1A1714]">{opt.label}</p>
                <p className="text-[10px] text-[#B0AAA3]">{opt.sub}</p>
              </div>
              {selected === opt.status && (
                <i className="ti ti-check text-[14px] text-[#1A1714]" aria-hidden="true" />
              )}
            </button>
          )
        })}

        {selected === 'booked' && (
          <div className="px-4 mt-2">
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="Confirmation code"
              className="w-full font-mono text-[12px] tracking-[0.06em] bg-[#F5F2EC] text-[#1A1714] rounded-[8px] px-3 py-[8px] border-none outline-none"
            />
          </div>
        )}

        <div className="px-4 mt-4">
          <button
            onClick={() => onUpdate(selected, code || undefined)}
            className="w-full bg-[#1A1714] text-white text-[12px] font-semibold rounded-[10px] py-[11px] border-none cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

function formatGroupDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', weekday: 'short' }).format(d)
}
