interface ProgressBarProps {
  value: number        // 0–100
  color?: string
  height?: number
}

export function ProgressBar({
  value,
  color = '#276127',
  height = 2.5,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)))

  return (
    <div
      className="w-full rounded-full overflow-hidden"
      style={{ height: `${height}px`, background: '#EDEAE4' }}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${clamped}%`, background: color }}
      />
    </div>
  )
}
