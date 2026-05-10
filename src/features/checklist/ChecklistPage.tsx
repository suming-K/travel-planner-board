'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { useAppStore } from '@/lib/store'
import type { ChecklistCategory } from '@/lib/types'

const CATEGORIES: { key: ChecklistCategory; label: string; icon: string }[] = [
  { key: 'essential',   label: 'Essential',    icon: 'ti-star' },
  { key: 'electronics', label: 'Electronics',  icon: 'ti-device-mobile' },
  { key: 'clothing',    label: 'Clothing',     icon: 'ti-shirt' },
  { key: 'toiletries',  label: 'Toiletries',   icon: 'ti-droplet' },
  { key: 'health',      label: 'Health',       icon: 'ti-pill' },
  { key: 'other',       label: 'Other',        icon: 'ti-dots' },
]

export function ChecklistPage() {
  const items        = useAppStore(s => s.checklistItems ?? [])
  const toggle       = useAppStore(s => s.toggleChecklistItem)
  const { user }   = useAuth()
  const allItems = useAppStore(s => s.checklistItems ?? [])
  const clDone   = allItems.filter(i => i.isChecked).length
  const prog     = { done: clDone, total: allItems.length, pct: allItems.length > 0 ? Math.round(clDone / allItems.length * 100) : 0 }
  const [active, setActive] = useState<ChecklistCategory | 'all'>('all')

  const shown = active === 'all'
    ? items
    : items.filter(i => i.category === active)

  const sorted = [...shown].sort((a, b) => {
    // Unchecked first, then by sort order
    if (a.isChecked !== b.isChecked) return a.isChecked ? 1 : -1
    return a.sortOrder - b.sortOrder
  })

  const doneInView = shown.filter(i => i.isChecked).length

  return (
    <div className="bg-[#FAFAF8] min-h-screen flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-[#EDEAE4] px-4 pt-[56px] pb-3 sticky top-0 z-10">
        <div className="flex justify-between items-baseline mb-3">
          <h1 className="text-[18px] font-bold text-[#1A1714] tracking-[-0.03em]">Checklist</h1>
          <span className="text-[10px] text-[#B0AAA3]">
            {prog.done}/{prog.total} packed
          </span>
        </div>

        {/* Progress */}
        <div className="h-[2px] bg-[#EDEAE4] rounded-full mb-3 overflow-hidden">
          <div
            className="h-[2px] rounded-full transition-all duration-500"
            style={{
              width: `${prog.pct}%`,
              background: prog.pct === 100 ? '#276127' : '#D4A017',
            }}
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-[5px] overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setActive('all')}
            className={`flex-shrink-0 text-[10px] font-semibold px-[9px] py-[3px] rounded-full border-none cursor-pointer transition-colors ${
              active === 'all'
                ? 'bg-[#1A1714] text-white'
                : 'bg-[#F5F2EC] text-[#5C5550]'
            }`}
          >
            All
          </button>
          {CATEGORIES.map(cat => {
            const catItems = items.filter(i => i.category === cat.key)
            if (catItems.length === 0) return null
            const catDone  = catItems.filter(i => i.isChecked).length
            return (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`flex-shrink-0 flex items-center gap-[4px] text-[10px] font-semibold px-[9px] py-[3px] rounded-full border-none cursor-pointer transition-colors ${
                  active === cat.key
                    ? 'bg-[#1A1714] text-white'
                    : 'bg-[#F5F2EC] text-[#5C5550]'
                }`}
              >
                <i className={`ti ${cat.icon} text-[10px]`} aria-hidden="true" />
                {cat.label}
                {catDone > 0 && (
                  <span className={`text-[9px] ${active === cat.key ? 'text-white/60' : 'text-[#B0AAA3]'}`}>
                    {catDone}/{catItems.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </header>

      {/* List */}
      <main className="flex-1 px-4 pt-3 pb-6">
        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <i className="ti ti-checks text-[28px] text-[#E8E4DE] mb-2" aria-hidden="true" />
            <p className="text-[12px] text-[#B0AAA3]">All packed!</p>
          </div>
        )}

        <div className="rounded-[14px] overflow-hidden border border-[#EDEAE4] bg-white">
          {sorted.map((item, idx) => {
            const isLast = idx === sorted.length - 1
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id, user?.id ?? 'anonymous')}
                className={`w-full flex items-center gap-3 px-[14px] py-[11px] text-left border-none cursor-pointer transition-colors ${
                  item.isChecked ? 'bg-[#FAFAF8]' : 'bg-white hover:bg-[#FAFAF8]'
                } ${!isLast ? 'border-b border-[#EDEAE4]' : ''}`}
                aria-pressed={item.isChecked}
              >
                {/* Checkbox */}
                <div
                  className={`w-[18px] h-[18px] rounded-full flex-shrink-0 border transition-all duration-150 flex items-center justify-center ${
                    item.isChecked
                      ? 'bg-[#1A1714] border-[#1A1714]'
                      : 'border-[#D0CCC6] bg-white'
                  }`}
                  aria-hidden="true"
                >
                  {item.isChecked && (
                    <i className="ti ti-check text-[10px] text-white" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`flex-1 text-[12px] font-medium leading-[1.3] transition-colors ${
                    item.isChecked ? 'text-[#B0AAA3] line-through' : 'text-[#1A1714]'
                  }`}
                >
                  {item.title}
                </span>

                {/* Category dot */}
                <span className="text-[9px] text-[#C0BAB2] font-medium capitalize flex-shrink-0">
                  {item.category}
                </span>
              </button>
            )
          })}
        </div>

        {/* Done state */}
        {prog.done === prog.total && prog.total > 0 && (
          <p className="text-center text-[11px] text-[#276127] font-medium mt-4">
            <i className="ti ti-sparkles text-[12px] mr-1" aria-hidden="true" />
            All packed — you're ready!
          </p>
        )}
      </main>
    </div>
  )
}
