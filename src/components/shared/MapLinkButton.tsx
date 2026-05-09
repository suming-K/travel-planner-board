interface MapLinkButtonProps {
  url?: string | null
  address?: string | null
  label?: string
  variant?: 'icon' | 'text'
}

export function MapLinkButton({
  url,
  address,
  label = 'Map',
  variant = 'icon',
}: MapLinkButtonProps) {
  const href = url ?? (address ? `https://maps.google.com/?q=${encodeURIComponent(address)}` : null)
  if (!href) return null

  if (variant === 'icon') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open in Maps"
        className="text-[#C0BAB2] hover:text-[#8A8480] transition-colors p-[2px]"
      >
        <i className="ti ti-map-pin text-[14px]" aria-hidden="true" />
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-[4px] text-[11px] font-medium text-[#7A4F00] bg-[#FEF6E4] rounded-[8px] px-[8px] py-[4px] hover:opacity-80 transition-opacity"
    >
      <i className="ti ti-map-pin text-[12px]" aria-hidden="true" />
      {label}
    </a>
  )
}
