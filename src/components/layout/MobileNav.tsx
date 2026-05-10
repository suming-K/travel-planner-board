'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  label: string
  icon: string
}

interface MobileNavProps {
  tripId: string
}

export function MobileNav({ tripId }: MobileNavProps): JSX.Element {
  const pathname = usePathname()
  const base = `/trips/${tripId}`

  const items: NavItem[] = [
    { href: base,                   label: 'Home',      icon: 'ti-home' },
    { href: `${base}/timeline`,     label: 'Timeline',  icon: 'ti-calendar' },
    { href: `${base}/reservations`, label: 'Bookings',  icon: 'ti-bookmark' },
    { href: `${base}/places`,       label: 'Places',    icon: 'ti-map-pin' },
    { href: `${base}/checklist`,    label: 'Checklist', icon: 'ti-checklist' },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-[#EDEAE4] bg-white pt-[10px] max-w-[430px] mx-auto"
      style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
      aria-label="Main navigation"
    >
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-[2px] text-[9px] tracking-[0.01em] transition-colors ${
              isActive ? 'text-[#1A1714] font-semibold' : 'text-[#C0BAB2]'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <i className={`ti ${item.icon} text-[18px]`} aria-hidden="true" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
