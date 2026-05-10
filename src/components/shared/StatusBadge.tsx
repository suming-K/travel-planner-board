import type { ReservationStatus } from '@/lib/types'
import { RESERVATION_STATUS_CONFIG } from '@/lib/utils'

interface StatusBadgeProps {
  status: ReservationStatus
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const cfg = RESERVATION_STATUS_CONFIG[status]
  const padding = size === 'sm' ? 'px-[7px] py-[2px]' : 'px-[9px] py-[3px]'
  const text = size === 'sm' ? 'text-[10px]' : 'text-[11px]'

  return (
    <span
      className={`inline-flex items-center rounded-[10px] font-medium tracking-[0.01em] ${padding} ${text}`}
      style={{ color: cfg.color, background: cfg.bgColor }}
    >
      {cfg.label}
    </span>
  )
}
