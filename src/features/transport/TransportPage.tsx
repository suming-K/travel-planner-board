'use client'

import { useAppStore } from '@/lib/store'
import { formatTransportTime } from '@/lib/utils'
import type { TransportLeg, TransportType } from '@/lib/types'
import { useState } from 'react'

const TYPE_CONFIG: Record<TransportType, { icon: string; label: string }> = {
  flight:     { icon: 'ti-plane',      label: 'Flight' },
  train:      { icon: 'ti-train',      label: 'Train' },
  rental_car: { icon: 'ti-car',        label: 'Rental Car' },
  bus:        { icon: 'ti-bus',        label: 'Bus' },
  ferry:      { icon: 'ti-ship',       label: 'Ferry' },
  other:      { icon: 'ti-route',      label: 'Transport' },
}

export function TransportPage() {
  const transport = useAppStore(s => s.transport)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyCode = (id: string, code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {})
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1800)
  }

  // Group by type
  const flights = transport.filter(t => t.type === 'flight')
  const trains  = transport.filter(t => t.type === 'train')
  const cars    = transport.filter(t => t.type === 'rental_car')

  return (
    <div className="bg-[#FAFAF8] min-h-screen flex flex-col">
      <header className="bg-white border-b border-[#EDEAE4] px-4 pt-[56px] pb-3">
        <h1 className="text-[18px] font-bold text-[#1A1714] tracking-[-0.03em]">Transport</h1>
      </header>

      <main className="flex-1 px-4 pt-3 pb-6 flex flex-col gap-4">

        {/* Flights */}
        {flights.length > 0 && (
          <div>
            <p className="text-[9px] font-semibold text-[#B0AAA3] tracking-[0.06em] uppercase mb-[6px]">Flights</p>
            <div className="rounded-[14px] overflow-hidden border border-[#EDEAE4] bg-white">
              {flights.map((leg, idx) => (
                <TransportRow
                  key={leg.id}
                  leg={leg}
                  isLast={idx === flights.length - 1}
                  copiedId={copiedId}
                  onCopy={copyCode}
                />
              ))}
            </div>
          </div>
        )}

        {/* Trains */}
        {trains.length > 0 && (
          <div>
            <p className="text-[9px] font-semibold text-[#B0AAA3] tracking-[0.06em] uppercase mb-[6px]">Train</p>
            <div className="rounded-[14px] overflow-hidden border border-[#EDEAE4] bg-white">
              {trains.map((leg, idx) => (
                <TransportRow
                  key={leg.id}
                  leg={leg}
                  isLast={idx === trains.length - 1}
                  copiedId={copiedId}
                  onCopy={copyCode}
                />
              ))}
            </div>
          </div>
        )}

        {/* Rental car */}
        {cars.length > 0 && (
          <div>
            <p className="text-[9px] font-semibold text-[#B0AAA3] tracking-[0.06em] uppercase mb-[6px]">Rental Car</p>
            <div className="rounded-[14px] overflow-hidden border border-[#EDEAE4] bg-white">
              {cars.map((leg, idx) => (
                <TransportRow
                  key={leg.id}
                  leg={leg}
                  isLast={idx === cars.length - 1}
                  copiedId={copiedId}
                  onCopy={copyCode}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function TransportRow({
  leg, isLast, copiedId, onCopy,
}: {
  leg: TransportLeg
  isLast: boolean
  copiedId: string | null
  onCopy: (id: string, code: string) => void
}) {
  const cfg = TYPE_CONFIG[leg.type]
  const departTime = formatTransportTime(leg.departAt, leg.departTimezone)
  const arriveTime = formatTransportTime(leg.arriveAt, leg.arriveTimezone)

  return (
    <div className={`px-[14px] py-[12px] ${!isLast ? 'border-b border-[#EDEAE4]' : ''}`}>
      {/* Header row */}
      <div className="flex items-center justify-between mb-[8px]">
        <div className="flex items-center gap-[7px]">
          <div className="w-[26px] h-[26px] rounded-[7px] bg-[#F5F2EC] flex items-center justify-center flex-shrink-0">
            <i className={`ti ${cfg.icon} text-[13px] text-[#8A8480]`} aria-hidden="true" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#1A1714]">
              {leg.carrier ?? cfg.label}
            </p>
            {leg.notes && (
              <p className="text-[10px] text-[#B0AAA3]">{leg.notes}</p>
            )}
          </div>
        </div>
        {leg.confirmationCode && (
          <button
            className="flex items-center gap-[5px] bg-[#F5F2EC] rounded-[6px] px-[8px] py-[3px] border-none cursor-pointer hover:bg-[#EDEAE4] transition-colors"
            onClick={() => onCopy(leg.id, leg.confirmationCode!)}
            aria-label={`Copy ${leg.confirmationCode}`}
          >
            <span className="font-mono text-[10px] tracking-[0.06em] text-[#5C5550] font-semibold">
              {leg.confirmationCode}
            </span>
            <i
              className={`ti ${copiedId === leg.id ? 'ti-check' : 'ti-copy'} text-[10px] text-[#B0AAA3]`}
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      {/* Route row */}
      <div className="flex items-center gap-[8px]">
        <div className="text-right" style={{ minWidth: 44 }}>
          <p className="text-[13px] font-bold text-[#1A1714] leading-none tracking-[-0.02em]">{departTime}</p>
          <p className="text-[9px] text-[#B0AAA3] mt-[2px] leading-none">{leg.departLocation}</p>
        </div>
        <div className="flex-1 flex items-center gap-[4px]">
          <div className="h-[1px] flex-1 bg-[#EDEAE4]" />
          <i className={`ti ${cfg.icon} text-[11px] text-[#C0BAB2]`} aria-hidden="true" />
          <div className="h-[1px] flex-1 bg-[#EDEAE4]" />
        </div>
        <div style={{ minWidth: 44 }}>
          <p className="text-[13px] font-bold text-[#1A1714] leading-none tracking-[-0.02em]">{arriveTime}</p>
          <p className="text-[9px] text-[#B0AAA3] mt-[2px] leading-none">{leg.arriveLocation}</p>
        </div>
      </div>
    </div>
  )
}
