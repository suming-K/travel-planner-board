import type {
  Trip, City, TripEvent, Reservation,
  TransportLeg, ChecklistItem, DayMeta, Reminder, Memory,
} from '@/lib/types'

// ─── Trip ─────────────────────────────────────────────────────────────────────

export const SEED_TRIP: Trip = {
  id: 'trip-ny-2026',
  title: 'New York · Boston · Niagara',
  startDate: '2026-05-21',
  endDate: '2026-06-05',
  coverImageUrl: null,
  status: 'planning',
  createdBy: 'user-yj',
  createdAt: '2026-04-01T00:00:00Z',
}

// ─── Cities ───────────────────────────────────────────────────────────────────

export const SEED_CITIES: City[] = [
  { id: 'city-ny1',      tripId: 'trip-ny-2026', name: 'New York I',    country: 'US', arriveDate: '2026-05-21', departDate: '2026-05-28', sortOrder: 0 },
  { id: 'city-dc',       tripId: 'trip-ny-2026', name: 'Washington DC', country: 'US', arriveDate: '2026-05-26', departDate: '2026-05-26', sortOrder: 1 },
  { id: 'city-boston',   tripId: 'trip-ny-2026', name: 'Boston',        country: 'US', arriveDate: '2026-05-28', departDate: '2026-05-31', sortOrder: 2 },
  { id: 'city-niagara',  tripId: 'trip-ny-2026', name: 'Niagara Falls', country: 'CA', arriveDate: '2026-05-31', departDate: '2026-06-02', sortOrder: 3 },
  { id: 'city-ny2',      tripId: 'trip-ny-2026', name: 'New York II',   country: 'US', arriveDate: '2026-06-02', departDate: '2026-06-05', sortOrder: 4 },
]

// ─── Day Meta ─────────────────────────────────────────────────────────────────

export const SEED_DAY_METAS: DayMeta[] = [
  { id: 'dm-0521', tripId: 'trip-ny-2026', date: '2026-05-21', sunrise: '05:35', sunset: '20:17', weatherSummary: null, dayNote: '도착일 · 체크인 · 휴식' },
  { id: 'dm-0522', tripId: 'trip-ny-2026', date: '2026-05-22', sunrise: '05:34', sunset: '20:18', weatherSummary: null, dayNote: '필하모닉 · Top of the Rock · 재즈바' },
  { id: 'dm-0523', tripId: 'trip-ny-2026', date: '2026-05-23', sunrise: '05:33', sunset: '20:19', weatherSummary: null, dayNote: '브루클린 · Peter Luger · 야경' },
  { id: 'dm-0524', tripId: 'trip-ny-2026', date: '2026-05-24', sunrise: '05:32', sunset: '20:20', weatherSummary: null, dayNote: 'MET 도슨트 · 센트럴파크 · 헬기투어' },
  { id: 'dm-0525', tripId: 'trip-ny-2026', date: '2026-05-25', sunrise: '05:32', sunset: '20:21', weatherSummary: null, dayNote: '다운타운 · 9/11 · One World' },
  { id: 'dm-0526', tripId: 'trip-ny-2026', date: '2026-05-26', sunrise: '05:31', sunset: '20:21', weatherSummary: null, dayNote: '워싱턴 DC 당일치기' },
  { id: 'dm-0527', tripId: 'trip-ny-2026', date: '2026-05-27', sunrise: '05:31', sunset: '20:22', weatherSummary: null, dayNote: '하이라인 · 루즈벨트 아일랜드 · 뮤지컬' },
  { id: 'dm-0528', tripId: 'trip-ny-2026', date: '2026-05-28', sunrise: '05:17', sunset: '19:58', weatherSummary: null, dayNote: 'Amtrak → 보스턴 · 펜웨이파크' },
  { id: 'dm-0529', tripId: 'trip-ny-2026', date: '2026-05-29', sunrise: '05:16', sunset: '19:59', weatherSummary: null, dayNote: '하버드 · MIT · 찰스강' },
  { id: 'dm-0530', tripId: 'trip-ny-2026', date: '2026-05-30', sunrise: '05:16', sunset: '20:00', weatherSummary: null, dayNote: 'Freedom Trail · 랍스터롤 · 노스엔드' },
  { id: 'dm-0531', tripId: 'trip-ny-2026', date: '2026-05-31', sunrise: '05:51', sunset: '20:43', weatherSummary: null, dayNote: '나이아가라 도착 · 유람선 · 선셋런' },
  { id: 'dm-0601', tripId: 'trip-ny-2026', date: '2026-06-01', sunrise: '05:51', sunset: '20:44', weatherSummary: null, dayNote: '온더레이크 · 와이너리 · 제트보트' },
  { id: 'dm-0602', tripId: 'trip-ny-2026', date: '2026-06-02', sunrise: '05:28', sunset: '20:24', weatherSummary: null, dayNote: 'NY 복귀 · MLB 7시' },
  { id: 'dm-0603', tripId: 'trip-ny-2026', date: '2026-06-03', sunrise: '05:28', sunset: '20:25', weatherSummary: null, dayNote: 'MoMA · 5번가 마무리' },
  { id: 'dm-0604', tripId: 'trip-ny-2026', date: '2026-06-04', sunrise: '05:28', sunset: '20:25', weatherSummary: null, dayNote: 'SoHo · NYU · 출국 준비' },
  { id: 'dm-0605', tripId: 'trip-ny-2026', date: '2026-06-05', sunrise: '05:27', sunset: '20:26', weatherSummary: null, dayNote: '귀국 ✈ YP132 01:00' },
]

// ─── Events ───────────────────────────────────────────────────────────────────

export const SEED_EVENTS: TripEvent[] = [
  // 5/21
  { id: 'ev-0521-1', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-21', startTime: '22:30', title: 'Arrive JFK — Check in', description: '에어프리미아 YP131 · 인천 21:25 출발', category: 'transit', status: 'upcoming', priority: 'must_do', isPinned: false, sortOrder: 0, placeId: null, reservationId: null, deletedAt: null },

  // 5/22
  { id: 'ev-0522-1', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-22', startTime: '11:00', title: 'NY Philharmonic — Janowski Conducts Mendelssohn', description: 'Fri 22 May 2026 · 11:00 AM', category: 'activity', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 0, placeId: 'place-philharmonic', reservationId: 'res-philharmonic', deletedAt: null },
  { id: 'ev-0522-2', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-22', startTime: '12:30', title: 'Sarabeth\'s Brunch', description: '에그 베네딕트', category: 'meal', status: 'upcoming', priority: 'medium', isPinned: false, sortOrder: 1, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0522-3', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-22', startTime: '14:00', title: 'NYPL + Bryant Park Picnic', description: null, category: 'leisure', status: 'upcoming', priority: 'medium', isPinned: false, sortOrder: 2, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0522-4', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-22', startTime: '19:00', title: 'Top of the Rock', description: '야경 · 예약 완료', category: 'activity', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 3, placeId: 'place-totr', reservationId: 'res-totr', deletedAt: null },
  { id: 'ev-0522-5', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-22', startTime: '22:30', title: 'Birdland Jazz Bar', description: '예약 완료', category: 'activity', status: 'upcoming', priority: 'high', isPinned: false, sortOrder: 4, placeId: null, reservationId: 'res-jazzbar', deletedAt: null },

  // 5/23
  { id: 'ev-0523-1', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-23', startTime: null, title: 'Summit One Vanderbilt', description: null, category: 'activity', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 0, placeId: 'place-summit', reservationId: 'res-summit', deletedAt: null },
  { id: 'ev-0523-2', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-23', startTime: '10:00', title: 'DUMBO + Brooklyn Flea', description: '감성 골목 산책 · 스모가스버그 플리', category: 'leisure', status: 'upcoming', priority: 'medium', isPinned: false, sortOrder: 1, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0523-3', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-23', startTime: '12:15', title: 'Peter Luger Steak House', description: '현금만 가능 · 12:15–16:00 사이 입장', category: 'meal', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 2, placeId: 'place-peterluger', reservationId: 'res-peterluger', deletedAt: null },
  { id: 'ev-0523-4', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-23', startTime: '17:00', title: 'Domino Park', description: null, category: 'leisure', status: 'upcoming', priority: 'low', isPinned: false, sortOrder: 3, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0523-5', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-23', startTime: '19:00', title: 'Grimaldi\'s Pizza', description: null, category: 'meal', status: 'upcoming', priority: 'medium', isPinned: false, sortOrder: 4, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0523-sun', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-23', startTime: '20:20', title: 'Sunset', description: '브루클린 브릿지 감상 추천', category: 'special', status: 'upcoming', priority: 'high', isPinned: false, sortOrder: 5, placeId: null, reservationId: null, deletedAt: null },

  // 5/24
  { id: 'ev-0524-1', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-24', startTime: '10:30', title: 'MET — Docent Tour', description: '메트로폴리탄 미술관 · 예약 완료', category: 'activity', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 0, placeId: 'place-met', reservationId: 'res-met', deletedAt: null },
  { id: 'ev-0524-2', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-24', startTime: '13:00', title: 'Central Park — Bike & Picnic', description: '자전거 & 피크닉 · Grand Bazaar (일 10-17)', category: 'leisure', status: 'upcoming', priority: 'medium', isPinned: false, sortOrder: 1, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0524-3', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-24', startTime: '16:00', title: '5th Avenue Shopping', description: null, category: 'leisure', status: 'upcoming', priority: 'low', isPinned: false, sortOrder: 2, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0524-4', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-24', startTime: '20:55', title: 'FlyNYON Helicopter Tour', description: '08:55 탑승 · 예약 필요', category: 'activity', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 3, placeId: null, reservationId: 'res-helicopter', deletedAt: null },

  // 5/25
  { id: 'ev-0525-1', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-25', startTime: '10:00', title: 'SoHo Morning', description: null, category: 'leisure', status: 'upcoming', priority: 'low', isPinned: false, sortOrder: 0, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0525-2', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-25', startTime: '13:00', title: 'Wall Street · Bull Statue · Fearless Girl', description: null, category: 'activity', status: 'upcoming', priority: 'medium', isPinned: false, sortOrder: 1, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0525-3', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-25', startTime: '14:30', title: 'Statue of Liberty Ferry + Battery Park', description: null, category: 'activity', status: 'upcoming', priority: 'high', isPinned: false, sortOrder: 2, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0525-4', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-25', startTime: '16:00', title: 'Oculus + World Trade Center Hub', description: null, category: 'activity', status: 'upcoming', priority: 'medium', isPinned: false, sortOrder: 3, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0525-5', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-25', startTime: '17:00', title: '9/11 Memorial & Museum', description: '아침 7시 무료티켓 오픈 → 17시 입장', category: 'activity', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 4, placeId: 'place-911', reservationId: 'res-911', deletedAt: null },
  { id: 'ev-0525-6', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-25', startTime: '19:00', title: 'One World Observatory', description: '야경 · 예약 완료', category: 'activity', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 5, placeId: null, reservationId: 'res-oneworld', deletedAt: null },

  // 5/26 — Washington DC day trip
  { id: 'ev-0526-1', tripId: 'trip-ny-2026', cityId: 'city-dc', eventDate: '2026-05-26', startTime: null, title: 'Washington DC Day Trip', description: 'Amtrak 왕복 · 셀프투어', category: 'transit', status: 'upcoming', priority: 'high', isPinned: false, sortOrder: 0, placeId: null, reservationId: 'res-amtrak-dc', deletedAt: null },

  // 5/27
  { id: 'ev-0527-1', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-27', startTime: '07:00', title: 'Central Park Morning Run', description: null, category: 'leisure', status: 'upcoming', priority: 'medium', isPinned: false, sortOrder: 0, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0527-2', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-27', startTime: '11:00', title: 'High Line + Vessel + Little Island', description: '스타벅스 로스터리', category: 'leisure', status: 'upcoming', priority: 'medium', isPinned: false, sortOrder: 1, placeId: 'place-vessel', reservationId: 'res-vessel', deletedAt: null },
  { id: 'ev-0527-3', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-27', startTime: '17:30', title: 'Roosevelt Island Tram', description: '일몰 감상', category: 'activity', status: 'upcoming', priority: 'high', isPinned: false, sortOrder: 2, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0527-4', tripId: 'trip-ny-2026', cityId: 'city-ny1', eventDate: '2026-05-27', startTime: '19:00', title: 'Broadway Musical', description: '라이온킹 · same-day rush 시도', category: 'activity', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 3, placeId: null, reservationId: 'res-musical', deletedAt: null },

  // 5/28 Boston
  { id: 'ev-0528-1', tripId: 'trip-ny-2026', cityId: 'city-boston', eventDate: '2026-05-28', startTime: '08:45', title: 'Amtrak → Boston South Station', description: '08:45 출발 → 13:11 도착', category: 'transit', status: 'upcoming', priority: 'must_do', isPinned: false, sortOrder: 0, placeId: null, reservationId: 'res-amtrak-bos', deletedAt: null },
  { id: 'ev-0528-2', tripId: 'trip-ny-2026', cityId: 'city-boston', eventDate: '2026-05-28', startTime: '16:10', title: 'Fenway Park', description: '보스턴 경기 · 예약 필요', category: 'activity', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 1, placeId: 'place-fenway', reservationId: 'res-fenway', deletedAt: null },

  // 5/29
  { id: 'ev-0529-1', tripId: 'trip-ny-2026', cityId: 'city-boston', eventDate: '2026-05-29', startTime: '09:00', title: 'Tatte Bakery + Harvard Campus', description: 'Harvard Coop 기념품 쇼핑', category: 'activity', status: 'upcoming', priority: 'high', isPinned: false, sortOrder: 0, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0529-2', tripId: 'trip-ny-2026', cityId: 'city-boston', eventDate: '2026-05-29', startTime: '13:00', title: 'MIT Campus', description: '돔 앞 돗자리 깔고 눕기', category: 'leisure', status: 'upcoming', priority: 'medium', isPinned: false, sortOrder: 1, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0529-3', tripId: 'trip-ny-2026', cityId: 'city-boston', eventDate: '2026-05-29', startTime: '16:00', title: 'Charles River Walk', description: null, category: 'leisure', status: 'upcoming', priority: 'low', isPinned: false, sortOrder: 2, placeId: null, reservationId: null, deletedAt: null },

  // 5/30
  { id: 'ev-0530-1', tripId: 'trip-ny-2026', cityId: 'city-boston', eventDate: '2026-05-30', startTime: '09:00', title: 'Boston Common + Public Garden', description: null, category: 'leisure', status: 'upcoming', priority: 'medium', isPinned: false, sortOrder: 0, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0530-2', tripId: 'trip-ny-2026', cityId: 'city-boston', eventDate: '2026-05-30', startTime: '10:30', title: 'Freedom Trail', description: '출발 → 퀸시마켓까지 30-60분', category: 'activity', status: 'upcoming', priority: 'high', isPinned: false, sortOrder: 1, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0530-3', tripId: 'trip-ny-2026', cityId: 'city-boston', eventDate: '2026-05-30', startTime: '13:00', title: 'Lobster Roll — Quincy Market', description: 'Neptune Oyster 대안', category: 'meal', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 2, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0530-4', tripId: 'trip-ny-2026', cityId: 'city-boston', eventDate: '2026-05-30', startTime: '18:00', title: 'North End — Little Italy Dinner', description: null, category: 'meal', status: 'upcoming', priority: 'high', isPinned: false, sortOrder: 3, placeId: null, reservationId: null, deletedAt: null },

  // 5/31 Niagara
  { id: 'ev-0531-1', tripId: 'trip-ny-2026', cityId: 'city-niagara', eventDate: '2026-05-31', startTime: '11:00', title: 'JetBlue BOS → BUF', description: '11:00 → 12:35 · GAGBEJ', category: 'transit', status: 'upcoming', priority: 'must_do', isPinned: false, sortOrder: 0, placeId: null, reservationId: 'res-jetblue', deletedAt: null },
  { id: 'ev-0531-2', tripId: 'trip-ny-2026', cityId: 'city-niagara', eventDate: '2026-05-31', startTime: '13:00', title: 'Rental Car Pickup', description: null, category: 'transit', status: 'upcoming', priority: 'must_do', isPinned: false, sortOrder: 1, placeId: null, reservationId: 'res-rentalcar', deletedAt: null },
  { id: 'ev-0531-3', tripId: 'trip-ny-2026', cityId: 'city-niagara', eventDate: '2026-05-31', startTime: '14:00', title: 'Buffalo Wings — Born Here', description: '본고장에서!', category: 'meal', status: 'upcoming', priority: 'high', isPinned: false, sortOrder: 2, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0531-4', tripId: 'trip-ny-2026', cityId: 'city-niagara', eventDate: '2026-05-31', startTime: '16:00', title: 'Cross into Canada 🇨🇦', description: null, category: 'transit', status: 'upcoming', priority: 'must_do', isPinned: false, sortOrder: 3, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0531-5', tripId: 'trip-ny-2026', cityId: 'city-niagara', eventDate: '2026-05-31', startTime: '17:00', title: 'Niagara Falls Boat Tour', description: '크록스 신고 >.< (우비 각오!)', category: 'activity', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 4, placeId: null, reservationId: 'res-niagaraboat', deletedAt: null },

  // 6/1
  { id: 'ev-0601-1', tripId: 'trip-ny-2026', cityId: 'city-niagara', eventDate: '2026-06-01', startTime: '09:00', title: 'Niagara-on-the-Lake', description: '차로 30분 · Living Water Worship Centre', category: 'activity', status: 'upcoming', priority: 'high', isPinned: false, sortOrder: 0, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0601-2', tripId: 'trip-ny-2026', cityId: 'city-niagara', eventDate: '2026-06-01', startTime: '13:00', title: 'Peller Estate Winery Tour', description: '10-15분 전 도착 · 예약 완료', category: 'activity', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 1, placeId: null, reservationId: 'res-winery', deletedAt: null },
  { id: 'ev-0601-3', tripId: 'trip-ny-2026', cityId: 'city-niagara', eventDate: '2026-06-01', startTime: '15:00', title: 'Niagara Jet Boat', description: '45분 전 도착 · 안전교육 · 예약 완료', category: 'activity', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 2, placeId: null, reservationId: 'res-jetboat', deletedAt: null },

  // 6/2
  { id: 'ev-0602-1', tripId: 'trip-ny-2026', cityId: 'city-ny2', eventDate: '2026-06-02', startTime: '11:00', title: 'Return Rental Car', description: null, category: 'transit', status: 'upcoming', priority: 'must_do', isPinned: false, sortOrder: 0, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0602-2', tripId: 'trip-ny-2026', cityId: 'city-ny2', eventDate: '2026-06-02', startTime: '13:56', title: 'American BUF → LGA', description: '13:56 → 15:19 · LSVVZM', category: 'transit', status: 'upcoming', priority: 'must_do', isPinned: false, sortOrder: 1, placeId: null, reservationId: 'res-aa', deletedAt: null },
  { id: 'ev-0602-3', tripId: 'trip-ny-2026', cityId: 'city-ny2', eventDate: '2026-06-02', startTime: '19:00', title: 'MLB Game', description: null, category: 'activity', status: 'upcoming', priority: 'high', isPinned: false, sortOrder: 2, placeId: null, reservationId: null, deletedAt: null },

  // 6/3-4
  { id: 'ev-0603-1', tripId: 'trip-ny-2026', cityId: 'city-ny2', eventDate: '2026-06-03', startTime: null, title: 'MoMA + 5th Avenue', description: '아쉬운 것들로 마무리', category: 'activity', status: 'upcoming', priority: 'medium', isPinned: false, sortOrder: 0, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0604-1', tripId: 'trip-ny-2026', cityId: 'city-ny2', eventDate: '2026-06-04', startTime: null, title: 'SoHo → NoHo → Washington Square', description: '출국 준비 · 23:00 출발', category: 'leisure', status: 'upcoming', priority: 'medium', isPinned: false, sortOrder: 0, placeId: null, reservationId: null, deletedAt: null },
  { id: 'ev-0605-1', tripId: 'trip-ny-2026', cityId: 'city-ny2', eventDate: '2026-06-05', startTime: '01:00', title: 'Depart JFK — 에어프리미아 YP132', description: '01:00 출발 → 인천 귀국', category: 'transit', status: 'upcoming', priority: 'must_do', isPinned: true, sortOrder: 0, placeId: null, reservationId: null, deletedAt: null },
]

// ─── Reservations ─────────────────────────────────────────────────────────────

export const SEED_RESERVATIONS: Reservation[] = [
  { id: 'res-philharmonic', tripId: 'trip-ny-2026', eventId: 'ev-0522-1', placeId: 'place-philharmonic', title: 'NY Philharmonic', status: 'rush_attempt', confirmationCode: null, reservationDate: '2026-05-22', reservationTime: '11:00', notes: 'Rush ticket · 데이티켓 시도', bookingUrl: 'https://www.nyphil.org', category: 'activity', deletedAt: null },
  { id: 'res-totr',         tripId: 'trip-ny-2026', eventId: 'ev-0522-4', placeId: 'place-totr', title: 'Top of the Rock', status: 'booked', confirmationCode: null, reservationDate: '2026-05-22', reservationTime: '19:00', notes: '예약 완료', bookingUrl: null, category: 'activity', deletedAt: null },
  { id: 'res-jazzbar',      tripId: 'trip-ny-2026', eventId: 'ev-0522-5', placeId: null, title: 'Birdland Jazz Bar', status: 'booked', confirmationCode: null, reservationDate: '2026-05-22', reservationTime: '22:30', notes: '예약 완료', bookingUrl: null, category: 'activity', deletedAt: null },
  { id: 'res-summit',       tripId: 'trip-ny-2026', eventId: 'ev-0523-1', placeId: 'place-summit', title: 'Summit One Vanderbilt', status: 'needed', confirmationCode: null, reservationDate: '2026-05-23', reservationTime: null, notes: null, bookingUrl: 'https://www.summitov.com', category: 'activity', deletedAt: null },
  { id: 'res-peterluger',   tripId: 'trip-ny-2026', eventId: 'ev-0523-3', placeId: 'place-peterluger', title: 'Peter Luger Steak House', status: 'needed', confirmationCode: null, reservationDate: '2026-05-23', reservationTime: '12:15', notes: '현금만 가능 · 12:15부터 16:00 사이', bookingUrl: 'https://www.peterluger.com', category: 'meal', deletedAt: null },
  { id: 'res-met',          tripId: 'trip-ny-2026', eventId: 'ev-0524-1', placeId: 'place-met', title: 'MET Docent Tour', status: 'booked', confirmationCode: null, reservationDate: '2026-05-24', reservationTime: '10:30', notes: '도슨트 예약 완료', bookingUrl: null, category: 'activity', deletedAt: null },
  { id: 'res-helicopter',   tripId: 'trip-ny-2026', eventId: 'ev-0524-4', placeId: null, title: 'FlyNYON Helicopter Tour', status: 'needed', confirmationCode: null, reservationDate: '2026-05-24', reservationTime: '08:55', notes: '08:55 탑승', bookingUrl: 'https://www.flynyon.com', category: 'activity', deletedAt: null },
  { id: 'res-911',          tripId: 'trip-ny-2026', eventId: 'ev-0525-5', placeId: 'place-911', title: '9/11 Memorial & Museum', status: 'rush_attempt', confirmationCode: null, reservationDate: '2026-05-25', reservationTime: '17:00', notes: '아침 7시 무료티켓 오픈 → 5시 입장', bookingUrl: null, category: 'activity', deletedAt: null },
  { id: 'res-oneworld',     tripId: 'trip-ny-2026', eventId: 'ev-0525-6', placeId: null, title: 'One World Observatory', status: 'booked', confirmationCode: null, reservationDate: '2026-05-25', reservationTime: null, notes: null, bookingUrl: null, category: 'activity', deletedAt: null },
  { id: 'res-amtrak-dc',    tripId: 'trip-ny-2026', eventId: 'ev-0526-1', placeId: null, title: 'Amtrak NYC ↔ Washington', status: 'booked', confirmationCode: null, reservationDate: '2026-05-26', reservationTime: null, notes: null, bookingUrl: null, category: 'transport', deletedAt: null },
  { id: 'res-vessel',       tripId: 'trip-ny-2026', eventId: 'ev-0527-2', placeId: 'place-vessel', title: 'Vessel', status: 'booked', confirmationCode: null, reservationDate: '2026-05-27', reservationTime: null, notes: null, bookingUrl: null, category: 'activity', deletedAt: null },
  { id: 'res-musical',      tripId: 'trip-ny-2026', eventId: 'ev-0527-4', placeId: null, title: 'Broadway Musical — Lion King', status: 'rush_attempt', confirmationCode: null, reservationDate: '2026-05-27', reservationTime: '19:00', notes: 'same-day rush 시도 · 5/22 5/27 6/3 6/4', bookingUrl: null, category: 'activity', deletedAt: null },
  { id: 'res-amtrak-bos',   tripId: 'trip-ny-2026', eventId: 'ev-0528-1', placeId: null, title: 'Amtrak NYC → Boston', status: 'booked', confirmationCode: null, reservationDate: '2026-05-28', reservationTime: '08:45', notes: '08:45 출발 → 13:11 South Station', bookingUrl: null, category: 'transport', deletedAt: null },
  { id: 'res-fenway',       tripId: 'trip-ny-2026', eventId: 'ev-0528-2', placeId: 'place-fenway', title: 'Boston — Fenway Park', status: 'needed', confirmationCode: null, reservationDate: '2026-05-28', reservationTime: '16:10', notes: null, bookingUrl: null, category: 'activity', deletedAt: null },
  { id: 'res-jetblue',      tripId: 'trip-ny-2026', eventId: 'ev-0531-1', placeId: null, title: 'JetBlue BOS → BUF', status: 'booked', confirmationCode: 'GAGBEJ', reservationDate: '2026-05-31', reservationTime: '11:00', notes: null, bookingUrl: null, category: 'transport', deletedAt: null },
  { id: 'res-rentalcar',    tripId: 'trip-ny-2026', eventId: 'ev-0531-2', placeId: null, title: 'Niagara Rental Car', status: 'booked', confirmationCode: null, reservationDate: '2026-05-31', reservationTime: '13:00', notes: '렌트카 온라인 체크인 필요', bookingUrl: null, category: 'transport', deletedAt: null },
  { id: 'res-niagaraboat',  tripId: 'trip-ny-2026', eventId: 'ev-0531-5', placeId: null, title: 'Niagara Boat Tour', status: 'booked', confirmationCode: null, reservationDate: '2026-05-31', reservationTime: '17:00', notes: '크록스 + 우비', bookingUrl: null, category: 'activity', deletedAt: null },
  { id: 'res-winery',       tripId: 'trip-ny-2026', eventId: 'ev-0601-2', placeId: null, title: 'Peller Estate Winery', status: 'booked', confirmationCode: null, reservationDate: '2026-06-01', reservationTime: '13:00', notes: '10-15분 전 도착', bookingUrl: null, category: 'activity', deletedAt: null },
  { id: 'res-jetboat',      tripId: 'trip-ny-2026', eventId: 'ev-0601-3', placeId: null, title: 'Niagara Jet Boat', status: 'booked', confirmationCode: null, reservationDate: '2026-06-01', reservationTime: '15:00', notes: '45분 전 도착 · 안전교육', bookingUrl: null, category: 'activity', deletedAt: null },
  { id: 'res-aa',           tripId: 'trip-ny-2026', eventId: 'ev-0602-2', placeId: null, title: 'American Airlines BUF → LGA', status: 'booked', confirmationCode: 'LSVVZM', reservationDate: '2026-06-02', reservationTime: '13:56', notes: '13:56 → 15:19', bookingUrl: null, category: 'transport', deletedAt: null },
]

// ─── Transport ────────────────────────────────────────────────────────────────

export const SEED_TRANSPORT: TransportLeg[] = [
  { id: 'tr-airf-in',  tripId: 'trip-ny-2026', type: 'flight',     carrier: '에어프리미아', confirmationCode: 'YP131',  departAt: '2026-05-21T12:25:00Z', arriveAt: '2026-05-21T02:30:00Z', departLocation: '인천 ICN', arriveLocation: 'JFK New York', departTimezone: 'Asia/Seoul', arriveTimezone: 'America/New_York', notes: 'YP131 · 21:25 ICN → 22:30 JFK' },
  { id: 'tr-amtrak-dc', tripId: 'trip-ny-2026', type: 'train',      carrier: 'Amtrak',       confirmationCode: null,    departAt: '2026-05-26T10:00:00Z', arriveAt: '2026-05-26T13:00:00Z', departLocation: 'Penn Station NYC', arriveLocation: 'Washington Union Station', departTimezone: 'America/New_York', arriveTimezone: 'America/New_York', notes: 'NYC ↔ Washington DC 왕복' },
  { id: 'tr-amtrak-bos', tripId: 'trip-ny-2026', type: 'train',     carrier: 'Amtrak',       confirmationCode: null,    departAt: '2026-05-28T12:45:00Z', arriveAt: '2026-05-28T17:11:00Z', departLocation: 'Penn Station NYC', arriveLocation: 'Boston South Station', departTimezone: 'America/New_York', arriveTimezone: 'America/New_York', notes: '08:45 출발 → 13:11 도착' },
  { id: 'tr-jetblue',   tripId: 'trip-ny-2026', type: 'flight',     carrier: 'JetBlue',      confirmationCode: 'GAGBEJ', departAt: '2026-05-31T15:00:00Z', arriveAt: '2026-05-31T16:35:00Z', departLocation: 'BOS Boston', arriveLocation: 'BUF Buffalo', departTimezone: 'America/New_York', arriveTimezone: 'America/New_York', notes: '11:00 → 12:35' },
  { id: 'tr-rental',    tripId: 'trip-ny-2026', type: 'rental_car', carrier: null,            confirmationCode: null,    departAt: '2026-05-31T17:00:00Z', arriveAt: '2026-06-02T15:00:00Z', departLocation: 'BUF Airport', arriveLocation: 'BUF Airport', departTimezone: 'America/New_York', arriveTimezone: 'America/New_York', notes: '나이아가라 · 반납 6/2 11:00' },
  { id: 'tr-aa',        tripId: 'trip-ny-2026', type: 'flight',     carrier: 'American Airlines', confirmationCode: 'LSVVZM', departAt: '2026-06-02T17:56:00Z', arriveAt: '2026-06-02T19:19:00Z', departLocation: 'BUF Buffalo', arriveLocation: 'LGA New York', departTimezone: 'America/New_York', arriveTimezone: 'America/New_York', notes: '13:56 → 15:19' },
  { id: 'tr-airf-out',  tripId: 'trip-ny-2026', type: 'flight',     carrier: '에어프리미아', confirmationCode: 'YP132',  departAt: '2026-06-05T05:00:00Z', arriveAt: '2026-06-07T09:00:00Z', departLocation: 'JFK New York', arriveLocation: '인천 ICN', departTimezone: 'America/New_York', arriveTimezone: 'Asia/Seoul', notes: 'YP132 · 01:00 JFK 출발' },
]

// ─── Checklist ────────────────────────────────────────────────────────────────

export const SEED_CHECKLIST: ChecklistItem[] = [
  { id: 'cl-01', tripId: 'trip-ny-2026', title: '삼각대', category: 'electronics', isChecked: false, checkedBy: null, sortOrder: 0 },
  { id: 'cl-02', tripId: 'trip-ny-2026', title: '핸드폰 방수팩', category: 'electronics', isChecked: false, checkedBy: null, sortOrder: 1 },
  { id: 'cl-03', tripId: 'trip-ny-2026', title: '크록스', category: 'clothing', isChecked: false, checkedBy: null, sortOrder: 2 },
  { id: 'cl-04', tripId: 'trip-ny-2026', title: '지르텍 (공항 도착 후 먹기)', category: 'health', isChecked: false, checkedBy: null, sortOrder: 3 },
  { id: 'cl-05', tripId: 'trip-ny-2026', title: '초경량 돗자리', category: 'essential', isChecked: false, checkedBy: null, sortOrder: 4 },
  { id: 'cl-06', tripId: 'trip-ny-2026', title: '우산', category: 'essential', isChecked: false, checkedBy: null, sortOrder: 5 },
  { id: 'cl-07', tripId: 'trip-ny-2026', title: '러닝벨트 + 호카 신발', category: 'clothing', isChecked: false, checkedBy: null, sortOrder: 6 },
  { id: 'cl-08', tripId: 'trip-ny-2026', title: '멀티탭', category: 'electronics', isChecked: false, checkedBy: null, sortOrder: 7 },
  { id: 'cl-09', tripId: 'trip-ny-2026', title: '밍이 렌즈 구매', category: 'electronics', isChecked: false, checkedBy: null, sortOrder: 8 },
  { id: 'cl-10', tripId: 'trip-ny-2026', title: '환전 (스테이크 현금)', category: 'essential', isChecked: false, checkedBy: null, sortOrder: 9 },
  { id: 'cl-11', tripId: 'trip-ny-2026', title: '트래블월렛 카드 새로 발급', category: 'essential', isChecked: true,  checkedBy: 'user-yj', sortOrder: 10 },
  { id: 'cl-12', tripId: 'trip-ny-2026', title: '렌트카 온라인 체크인', category: 'essential', isChecked: false, checkedBy: null, sortOrder: 11 },
  { id: 'cl-13', tripId: 'trip-ny-2026', title: '항공권 스마트 체크인', category: 'essential', isChecked: false, checkedBy: null, sortOrder: 12 },
]

// ─── Reminders ────────────────────────────────────────────────────────────────

export const SEED_REMINDERS: Reminder[] = [
  { id: 'rm-1', tripId: 'trip-ny-2026', title: 'Musical same-day rush', body: '매일 13시, 19시 공연 시도 · 5/22 5/27 6/3 6/4', recurrence: 'daily', triggerTime: '10:00', isActive: true },
  { id: 'rm-2', tripId: 'trip-ny-2026', title: 'Times Square Midnight Moment', body: '매일 23:57–00:00 · 타임스퀘어에서 감상', recurrence: 'daily', triggerTime: '23:30', isActive: true },
  { id: 'rm-3', tripId: 'trip-ny-2026', title: '뉴욕 일몰', body: '뉴욕 일몰 약 20:20 · 좋은 장소 미리 체크', recurrence: 'daily', triggerTime: '19:50', isActive: true },
  { id: 'rm-4', tripId: 'trip-ny-2026', title: '9/11 Museum 무료 티켓', body: '아침 7시 온라인 오픈 → 5시 입장 목표', recurrence: 'once', triggerTime: '07:00', isActive: true },
]

// ─── Memories ─────────────────────────────────────────────────────────────────

export const SEED_MEMORIES: Memory[] = [
  { id: 'mem-1', tripId: 'trip-ny-2026', eventId: 'ev-0523-3', memoryDate: '2026-05-23', songTitle: 'i like me better', songArtist: 'lauv', note: null },
  { id: 'mem-2', tripId: 'trip-ny-2026', eventId: 'ev-0524-2', memoryDate: '2026-05-24', songTitle: 'summer', songArtist: 'volunteers', note: '센트럴파크 자전거 타면서' },
]
