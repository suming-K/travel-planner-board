'use client'

import { useAppStore } from '@/lib/store'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { MapLinkButton } from '@/components/shared/MapLinkButton'
import { formatDateShort, getTimelineLineColor } from '@/lib/utils'
import Link from 'next/link'

interface TodayCardProps { tripId: string }

export function TodayCard({ tripId }: TodayCardProps) {
  const events   = useAppStore(s => s.getTodayEvents())
  const places   = useAppStore(s => s.places)
  const reservations = useAppStore(s => s.reservations)
  const selectedDate = useAppStore(s => s.selectedDate)
  const preview  = events.slice(0, 4)
  const remaining = events.length - preview.length

  return (
    <div className="rounded-[14px] overflow-hidden border border-[#EDEAE4] bg-white mb-[11px]">
      <div className="flex justify-between items-center px-[14px] pt-[12px] pb-[10px] border-b border-[#EDEAE4]">
        <div>
          <p className="text-[12px] font-bold text-[#1A1714] tracking-[-0.01em]">Today's schedule</p>
          <p className="text-[10px] text-[#B0AAA3] mt-[1px]">
            {formatDateShort(selectedDate)} · {events.length} events
          </p>
        </div>
        <Link href={`/trips/${tripId}/timeline`} className="text-[10px] text-[#B0AAA3] flex items-center gap-[2px] no-underline hover:text-[#5C5550] transition-colors">
          All <i className="ti ti-chevron-right text-[11px]" aria-hidden="true" />
        </Link>
      </div>

      {preview.length === 0 ? (
        <div className="px-[14px] py-[14px]">
          <p className="text-[11px] text-[#B0AAA3] text-center">No events today</p>
        </div>
      ) : (
        <div>
          {preview.map((event, idx) => {
            const place = event.placeId ? places.find(p => p.id === event.placeId) : null
            const reservation = event.reservationId ? reservations.find(r => r.id === event.reservationId) : null
            const isLast = idx === preview.length - 1 && remaining === 0
            const lineColor = getTimelineLineColor(event.category, reservation?.status ?? null)

            return (
              <div
                key={event.id}
                className={`flex gap-[10px] px-[14px] py-[9px] items-start ${!isLast ? 'border-b border-[#EDEAE4]' : ''}`}
              >
                <p className="text-[10px] text-[#C0BAB2] w-[30px] flex-shrink-0 text-right pt-[1px] tabular-nums leading-none">
                  {event.startTime ? event.startTime.slice(0, 5) : event.category === 'special' ? '—' : ''}
                </p>
                <div className="flex-shrink-0 rounded-[1px] self-stretch mt-[4px]" style={{ width: '1.5px', background: lineColor }} aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-[#1A1714] mb-[3px] truncate"
                    style={{ color: event.category === 'special' && event.title.toLowerCase().includes('sunset') ? '#9A7200'
                      : event.title.toLowerCase().includes('midnight') ? '#5C3D8A' : '#1A1714' }}>
                    {event.title}
                  </p>
                  <div className="flex items-center gap-[5px] flex-wrap">
                    {reservation && <StatusBadge status={reservation.status} />}
                    {!reservation && event.description && (
                      <p className="text-[10px] text-[#B0AAA3] truncate">{event.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-[4px] flex-shrink-0 pt-[1px]">
                  {reservation?.status === 'needed' && (
                    <button className="text-[10px] font-semibold bg-[#F5F2EC] text-[#1A1714] rounded-[7px] px-[7px] py-[3px] border-none cursor-pointer">Book</button>
                  )}
                  {place?.googleMapsUrl ? (
                    <MapLinkButton url={place.googleMapsUrl} />
                  ) : (
                    <i className="ti ti-map-pin text-[13px] text-[#E8E4DE]" aria-hidden="true" />
                  )}
                </div>
              </div>
            )
          })}
          {remaining > 0 && (
            <Link href={`/trips/${tripId}/timeline`} className="block text-center text-[10px] text-[#B0AAA3] py-[8px] no-underline hover:text-[#5C5550] transition-colors">
              +{remaining} more
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
