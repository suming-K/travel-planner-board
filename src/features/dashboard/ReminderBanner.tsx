'use client'

import { useAppStore } from '@/lib/store'

export function ReminderBanner(): JSX.Element | null {
  // Select raw reminders array — safe ?? fallback for SSR
  const reminders = useAppStore(s => s.reminders ?? [])
  const active    = reminders.filter(r => r.isActive)

  if (active.length === 0) return null

  const preview = active
    .slice(0, 3)
    .map(r => r.body ?? r.title)
    .join(' · ')

  return (
    <div
      className="rounded-r-[9px] py-[9px] px-[12px] mb-[12px]"
      style={{ background: '#FDFAF2', borderLeft: '2.5px solid #D4A017' }}
    >
      <p className="text-[9px] font-bold tracking-[0.07em] mb-[2px]" style={{ color: '#7A5C00' }}>
        TODAY
      </p>
      <p className="text-[11px] leading-[1.55]" style={{ color: '#8A6800' }}>
        {preview}
      </p>
    </div>
  )
}
