'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import type { CurrencyCode, ExpenseCategory } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'

const CATEGORY_META: Record<ExpenseCategory, { label: string; icon: string }> = {
  transport:     { label: 'Transport',    icon: 'ti-plane' },
  accommodation: { label: 'Stay',         icon: 'ti-building' },
  food:          { label: 'Food',         icon: 'ti-tools-kitchen-2' },
  activity:      { label: 'Activities',   icon: 'ti-star' },
  shopping:      { label: 'Shopping',     icon: 'ti-shopping-bag' },
  other:         { label: 'Other',        icon: 'ti-dots' },
}

type CurTab = 'USD' | 'CAD'

export function BudgetPage() {
  const expenses = useAppStore(s => s.expenses ?? [])
  const [curTab, setCurTab] = useState<CurTab>('USD')

  const forCurrency = expenses.filter(e => e.currency === curTab)

  const totalEst = forCurrency.reduce((s, e) => s + (e.amountEstimated ?? 0), 0)
  const totalAct = forCurrency.reduce((s, e) => s + (e.amountActual    ?? 0), 0)
  const diff     = totalAct - totalEst

  const cats = [...new Set(forCurrency.map(e => e.category))] as ExpenseCategory[]

  const cashTotal    = forCurrency.filter(e => e.paymentMethod === 'cash')
    .reduce((s, e) => s + (e.amountActual ?? e.amountEstimated ?? 0), 0)
  const nonCashTotal = forCurrency.filter(e => e.paymentMethod !== 'cash')
    .reduce((s, e) => s + (e.amountActual ?? e.amountEstimated ?? 0), 0)

  return (
    <div className="bg-[#FAFAF8] min-h-screen flex flex-col">

      <header className="bg-white border-b border-[#EDEAE4] px-4 pt-[56px] pb-3">
        <div className="flex justify-between items-baseline mb-4">
          <h1 className="text-[18px] font-bold text-[#1A1714] tracking-[-0.03em]">Budget</h1>
          {/* Currency toggle */}
          <div className="flex gap-[3px] bg-[#F5F2EC] rounded-full p-[2px]">
            {(['USD', 'CAD'] as CurTab[]).map(c => (
              <button
                key={c}
                onClick={() => setCurTab(c)}
                className={`text-[10px] font-semibold px-[10px] py-[3px] rounded-full border-none cursor-pointer transition-colors ${
                  curTab === c ? 'bg-[#1A1714] text-white' : 'bg-transparent text-[#5C5550]'
                }`}
              >{c}</button>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-2 gap-[7px]">
          <div className="bg-[#F8F7F5] rounded-[12px] p-[11px_13px]">
            <p className="text-[9px] font-semibold text-[#B0AAA3] tracking-[0.05em] uppercase mb-[4px]">Estimated</p>
            <p className="text-[20px] font-bold text-[#1A1714] tracking-[-0.03em] leading-none">
              {formatCurrency(totalEst, curTab)}
            </p>
          </div>
          <div className="bg-[#F8F7F5] rounded-[12px] p-[11px_13px]">
            <p className="text-[9px] font-semibold text-[#B0AAA3] tracking-[0.05em] uppercase mb-[4px]">Actual</p>
            <div className="flex items-baseline gap-[5px]">
              <p className="text-[20px] font-bold text-[#1A1714] tracking-[-0.03em] leading-none">
                {totalAct > 0 ? formatCurrency(totalAct, curTab) : '—'}
              </p>
              {totalAct > 0 && diff !== 0 && (
                <span
                  className="text-[10px] font-semibold"
                  style={{ color: diff > 0 ? '#C0392B' : '#276127' }}
                >
                  {diff > 0 ? '+' : ''}{formatCurrency(Math.abs(diff), curTab)}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 pt-4 pb-6 flex flex-col gap-4">

        {/* Payment method */}
        {(cashTotal > 0 || nonCashTotal > 0) && (
          <div>
            <p className="text-[9px] font-semibold text-[#B0AAA3] tracking-[0.06em] uppercase mb-[6px]">
              Payment method
            </p>
            <div className="bg-white rounded-[14px] border border-[#EDEAE4] overflow-hidden">
              {cashTotal > 0 && (
                <div className={`flex items-center justify-between px-[14px] py-[10px] ${nonCashTotal > 0 ? 'border-b border-[#EDEAE4]' : ''}`}>
                  <div className="flex items-center gap-[8px]">
                    <i className="ti ti-cash text-[14px] text-[#B0AAA3]" aria-hidden="true" />
                    <span className="text-[12px] font-medium text-[#1A1714]">Cash</span>
                  </div>
                  <span className="text-[12px] font-semibold text-[#1A1714]">
                    {formatCurrency(cashTotal, curTab)}
                  </span>
                </div>
              )}
              {nonCashTotal > 0 && (
                <div className="flex items-center justify-between px-[14px] py-[10px]">
                  <div className="flex items-center gap-[8px]">
                    <i className="ti ti-credit-card text-[14px] text-[#B0AAA3]" aria-hidden="true" />
                    <span className="text-[12px] font-medium text-[#1A1714]">Card / prepaid</span>
                  </div>
                  <span className="text-[12px] font-semibold text-[#1A1714]">
                    {formatCurrency(nonCashTotal, curTab)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Category breakdown */}
        {cats.length > 0 && (
          <div>
            <p className="text-[9px] font-semibold text-[#B0AAA3] tracking-[0.06em] uppercase mb-[6px]">
              By category
            </p>
            <div className="bg-white rounded-[14px] border border-[#EDEAE4] overflow-hidden">
              {cats.map((cat, idx) => {
                const catItems = forCurrency.filter(e => e.category === cat)
                const est = catItems.reduce((s, e) => s + (e.amountEstimated ?? 0), 0)
                const act = catItems.reduce((s, e) => s + (e.amountActual    ?? 0), 0)
                const meta = CATEGORY_META[cat]
                const isLast = idx === cats.length - 1

                return (
                  <div
                    key={cat}
                    className={`flex items-center gap-3 px-[14px] py-[10px] ${!isLast ? 'border-b border-[#EDEAE4]' : ''}`}
                  >
                    <div className="w-[28px] h-[28px] rounded-[8px] bg-[#F5F2EC] flex items-center justify-center flex-shrink-0">
                      <i className={`ti ${meta.icon} text-[13px] text-[#8A8480]`} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[12px] font-medium text-[#1A1714]">{meta.label}</p>
                      {est > 0 && (
                        <p className="text-[10px] text-[#B0AAA3]">est. {formatCurrency(est, curTab)}</p>
                      )}
                    </div>
                    <p className="text-[12px] font-semibold text-[#1A1714]">
                      {act > 0 ? formatCurrency(act, curTab) : '—'}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* All items */}
        {forCurrency.length > 0 && (
          <div>
            <p className="text-[9px] font-semibold text-[#B0AAA3] tracking-[0.06em] uppercase mb-[6px]">
              All items
            </p>
            <div className="bg-white rounded-[14px] border border-[#EDEAE4] overflow-hidden">
              {forCurrency.map((exp, idx) => {
                const isLast = idx === forCurrency.length - 1
                return (
                  <div
                    key={exp.id}
                    className={`flex items-center gap-3 px-[14px] py-[9px] ${!isLast ? 'border-b border-[#EDEAE4]' : ''}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-[#1A1714] truncate">{exp.title}</p>
                      <div className="flex items-center gap-[5px] mt-[1px]">
                        <span className="text-[9px] text-[#B0AAA3] capitalize">
                          {CATEGORY_META[exp.category]?.label ?? exp.category}
                        </span>
                        <span className="text-[9px] text-[#C8C3BC]">·</span>
                        <span className="text-[9px] text-[#B0AAA3] capitalize">{exp.paymentMethod}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {exp.amountActual != null ? (
                        <p className="text-[11px] font-semibold text-[#1A1714]">
                          {formatCurrency(exp.amountActual, curTab)}
                        </p>
                      ) : exp.amountEstimated != null ? (
                        <p className="text-[11px] text-[#B0AAA3]">
                          ~{formatCurrency(exp.amountEstimated, curTab)}
                        </p>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {forCurrency.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <i className="ti ti-currency-dollar text-[28px] text-[#E8E4DE] mb-2" aria-hidden="true" />
            <p className="text-[12px] text-[#B0AAA3]">No {curTab} expenses yet</p>
          </div>
        )}
      </main>
    </div>
  )
}
