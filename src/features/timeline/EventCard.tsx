'use client'

import type { TripEvent, Place, Reservation } from '@/lib/types'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { MapLinkButton } from '@/components/shared/MapLinkButton'
import { getTimelineLineColor } from '@/lib/utils'

interface EventCardProps {
  event: TripEvent
  place?: Place | null
  reservation?: Reservation | null
  isLast?: boolean
  onBook?: (id: string) => void
}

export function EventCard({ event, place, reservation, isLast = false, onBook }: EventCardProps) {
  const lineColor  = getTimelineLineColor(event.category, reservation?.status ?? null)
  const isSunset   = event.category === 'special' && event.title.toLowerCase().includes('sunset')
  const isMidnight = event.title.toLowerCase().includes('midnight')
  const isNeeded   = reservation?.status === 'needed'
  const isBooked   = reservation?.status === 'booked' || reservation?.status === 'done'
  const titleColor = isSunset ? '#9A7200' : isMidnight ? '#5C3D8A' : '#1A1714'
  const mapsHref   = place?.googleMapsUrl ?? (place?.address ? `https://maps.google.com/?q=${encodeURIComponent(place.address)}` : null)

  return (
    <div className={`flex gap-[10px] px-[14px] py-[9px] items-start ${!isLast ? 'border-b border-[#EDEAE4]' : ''}`}>
      <p className="text-[10px] text-[#C0BAB2] w-[30px] flex-shrink-0 text-right pt-[1px] tabular-nums leading-none">
        {event.startTime ? event.startTime.slice(0, 5) : event.category === 'special' ? '—' : ''}
      </p>
      <div className="flex-shrink-0 rounded-[1px] self-stretch mt-[4px]" style={{ width: '1.5px', background: lineColor }} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-semibold leading-[1.3] mb-[3px]" style={{ color: titleColor }}>
          {event.isPinned && <span className="inline-block w-[5px] h-[5px] rounded-full bg-[#D4A017] mr-[4px] mb-[1px] align-middle" aria-hidden="true" />}
          {event.title}
        </p>
        <div className="flex items-center gap-[5px] flex-wrap">
          {reservation && <StatusBadge status={reservation.status} />}
          {event.description && (
            <p className="text-[10px] text-[#B0AAA3] leading-[1.3]">{event.description}</p>
          )}
        </div>
        {isBooked && reservation?.confirmationCode && (
          <p className="font-mono text-[10px] text-[#B0AAA3] mt-[3px] tracking-wider">{reservation.confirmationCode}</p>
        )}
      </div>
      <div className="flex items-center gap-[4px] flex-shrink-0 mt-[1px]">
        {isNeeded && (
          <button
            className="text-[10px] font-semibold bg-[#F5F2EC] text-[#1A1714] rounded-[7px] px-[7px] py-[3px] border-none cursor-pointer hover:bg-[#EDEAE4] transition-colors"
            onClick={() => onBook?.(event.id)}
            aria-label={`Book ${event.title}`}
          >Book</button>
        )}
        {mapsHref ? (
          <MapLinkButton url={mapsHref} />
        ) : (
          <i className="ti ti-map-pin text-[13px] text-[#E8E4DE]" aria-hidden="true" />
        )}
      </div>
    </div>
  )
}
