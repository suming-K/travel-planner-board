import type { Expense } from '@/lib/types'

export const SEED_EXPENSES: Expense[] = [
  // USD
  { id: 'ex-01', tripId: 'trip-ny-2026', eventId: null,        title: '항공권 (에어프리미아 왕복)',       category: 'transport',     amountEstimated: 1800, amountActual: null, currency: 'USD', paymentMethod: 'card', expenseDate: null },
  { id: 'ex-02', tripId: 'trip-ny-2026', eventId: null,        title: 'Kimpton Era Hotel (7박)',        category: 'accommodation', amountEstimated: 2100, amountActual: null, currency: 'USD', paymentMethod: 'card', expenseDate: null },
  { id: 'ex-03', tripId: 'trip-ny-2026', eventId: null,        title: 'YOTEL Boston (3박)',             category: 'accommodation', amountEstimated: 600,  amountActual: null, currency: 'USD', paymentMethod: 'card', expenseDate: null },
  { id: 'ex-04', tripId: 'trip-ny-2026', eventId: null,        title: 'Oakes Hotel Niagara (2박)',      category: 'accommodation', amountEstimated: 400,  amountActual: null, currency: 'USD', paymentMethod: 'card', expenseDate: null },
  { id: 'ex-05', tripId: 'trip-ny-2026', eventId: 'ev-0523-3', title: 'Peter Luger Steak House',       category: 'food',          amountEstimated: 200,  amountActual: null, currency: 'USD', paymentMethod: 'cash', expenseDate: '2026-05-23' },
  { id: 'ex-06', tripId: 'trip-ny-2026', eventId: null,        title: 'FlyNYON Helicopter Tour',       category: 'activity',      amountEstimated: 300,  amountActual: null, currency: 'USD', paymentMethod: 'card', expenseDate: null },
  { id: 'ex-07', tripId: 'trip-ny-2026', eventId: null,        title: 'Summit One Vanderbilt',         category: 'activity',      amountEstimated: 50,   amountActual: null, currency: 'USD', paymentMethod: 'card', expenseDate: null },
  { id: 'ex-08', tripId: 'trip-ny-2026', eventId: null,        title: 'Broadway Musical',              category: 'activity',      amountEstimated: 120,  amountActual: null, currency: 'USD', paymentMethod: 'card', expenseDate: null },
  { id: 'ex-09', tripId: 'trip-ny-2026', eventId: null,        title: '식비 (일반)',                    category: 'food',          amountEstimated: 800,  amountActual: null, currency: 'USD', paymentMethod: 'card', expenseDate: null },
  { id: 'ex-10', tripId: 'trip-ny-2026', eventId: null,        title: 'Amtrak (NYC↔DC + NYC→BOS)',     category: 'transport',     amountEstimated: 180,  amountActual: null, currency: 'USD', paymentMethod: 'card', expenseDate: null },
  { id: 'ex-11', tripId: 'trip-ny-2026', eventId: null,        title: '나이아가라 렌트카',               category: 'transport',     amountEstimated: 150,  amountActual: null, currency: 'USD', paymentMethod: 'card', expenseDate: null },
  { id: 'ex-12', tripId: 'trip-ny-2026', eventId: null,        title: '쇼핑 / 기념품',                  category: 'shopping',      amountEstimated: 300,  amountActual: null, currency: 'USD', paymentMethod: 'card', expenseDate: null },
  // CAD
  { id: 'ex-13', tripId: 'trip-ny-2026', eventId: null,        title: 'Peller Estate Winery Tour',     category: 'activity',      amountEstimated: 80,   amountActual: null, currency: 'CAD', paymentMethod: 'card', expenseDate: null },
  { id: 'ex-14', tripId: 'trip-ny-2026', eventId: null,        title: 'Niagara Jet Boat',              category: 'activity',      amountEstimated: 90,   amountActual: null, currency: 'CAD', paymentMethod: 'card', expenseDate: null },
  { id: 'ex-15', tripId: 'trip-ny-2026', eventId: null,        title: '나이아가라 현지 식비',            category: 'food',          amountEstimated: 120,  amountActual: null, currency: 'CAD', paymentMethod: 'card', expenseDate: null },
  { id: 'ex-16', tripId: 'trip-ny-2026', eventId: null,        title: '아이스와인 구매',                 category: 'shopping',      amountEstimated: 60,   amountActual: null, currency: 'CAD', paymentMethod: 'cash', expenseDate: null },
]
