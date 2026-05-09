-- ============================================================
-- Travel Planner — Seed Data SQL
-- seed.ts / seedPlaces.ts / seedExpenses.ts → SQL INSERT
-- ============================================================

-- trips
insert into trips (id, title, start_date, end_date, cover_image_url, status, created_by, created_at)
values ('trip-ny-2026', 'New York · Boston · Niagara', '2026-05-21', '2026-06-05', null, 'planning', 'user-yj', '2026-04-01T00:00:00Z')
on conflict (id) do nothing;

-- cities
insert into cities (id, trip_id, name, country, arrive_date, depart_date, sort_order) values
  ('city-ny1',     'trip-ny-2026', 'New York I',    'US', '2026-05-21', '2026-05-28', 0),
  ('city-dc',      'trip-ny-2026', 'Washington DC', 'US', '2026-05-26', '2026-05-26', 1),
  ('city-boston',  'trip-ny-2026', 'Boston',        'US', '2026-05-28', '2026-05-31', 2),
  ('city-niagara', 'trip-ny-2026', 'Niagara Falls', 'CA', '2026-05-31', '2026-06-02', 3),
  ('city-ny2',     'trip-ny-2026', 'New York II',   'US', '2026-06-02', '2026-06-05', 4)
on conflict (id) do nothing;

-- places (insert before events — FK dependency)
insert into places (id, trip_id, city_id, name, address, google_maps_url, website_url, opening_hours, notes, category, lat, lng, visited, favorite, deleted_at) values
  ('place-summit',      'trip-ny-2026', 'city-ny1',     'Summit One Vanderbilt',          '45 E 42nd St, New York, NY 10017',          'https://maps.google.com/?q=Summit+One+Vanderbilt+NYC',              'https://www.summitov.com',           '9:00 AM – 11:00 PM',              null,                         'activity', 40.7527, -73.9772, false, true,  null),
  ('place-peterluger',  'trip-ny-2026', 'city-ny1',     'Peter Luger Steak House',        '178 Broadway, Brooklyn, NY 11211',          'https://maps.google.com/?q=Peter+Luger+Steak+House+Brooklyn',      'https://www.peterluger.com',         'Mon–Thu 11:45–9:45 PM',           '현금만 가능 · 12:15부터 16:00 사이 입장', 'meal',     40.7099, -73.9634, false, true,  null),
  ('place-totr',        'trip-ny-2026', 'city-ny1',     'Top of the Rock',                '30 Rockefeller Plaza, New York, NY 10112',  'https://maps.google.com/?q=Top+of+the+Rock+Rockefeller+Center',   'https://www.topoftherocknyc.com',    '10:00 AM – 11:00 PM',            '야경 추천 · 일몰 후 방문',         'activity', 40.7587, -73.9787, false, false, null),
  ('place-met',         'trip-ny-2026', 'city-ny1',     'The Metropolitan Museum of Art', '1000 5th Ave, New York, NY 10028',          'https://maps.google.com/?q=Metropolitan+Museum+of+Art+NYC',       'https://www.metmuseum.org',          'Sun–Thu 10:00–5:00',              '도슨트 10:30 예약',                'activity', 40.7794, -73.9632, false, true,  null),
  ('place-911',         'trip-ny-2026', 'city-ny1',     '9/11 Memorial & Museum',         '180 Greenwich St, New York, NY 10007',      'https://maps.google.com/?q=9/11+Memorial+Museum',                 'https://www.911memorial.org',        '9:00 AM – 8:00 PM',              '아침 7시 무료티켓 오픈',            'activity', 40.7115, -74.0131, false, false, null),
  ('place-vessel',      'trip-ny-2026', 'city-ny1',     'Vessel — Hudson Yards',          '20 Hudson Yards, New York, NY 10001',       'https://maps.google.com/?q=Vessel+Hudson+Yards+NYC',              null,                                 '10:00 AM – 8:00 PM',             '예약 완료',                         'activity', 40.7539, -74.0022, false, false, null),
  ('place-philharmonic','trip-ny-2026', 'city-ny1',     'David Geffen Hall',              '10 Lincoln Center Plaza, New York, NY 10023','https://maps.google.com/?q=David+Geffen+Hall+Lincoln+Center',    'https://www.nyphil.org',             null,                              'Rush ticket 당일 아침 오픈',        'activity', 40.7725, -73.9836, false, false, null),
  ('place-fenway',      'trip-ny-2026', 'city-boston',  'Fenway Park',                    '4 Jersey St, Boston, MA 02215',             'https://maps.google.com/?q=Fenway+Park+Boston',                   'https://www.mlb.com/redsox/ballpark', null,                             '보스턴 경기 · 예약 필요',           'activity', 42.3467, -71.0972, false, true,  null)
on conflict (id) do nothing;

-- reservations (insert before events — FK dependency)
insert into reservations (id, trip_id, event_id, place_id, title, status, confirmation_code, reservation_date, reservation_time, notes, booking_url, category, deleted_at) values
  ('res-philharmonic', 'trip-ny-2026', 'ev-0522-1', 'place-philharmonic', 'NY Philharmonic',            'rush_attempt', null,     '2026-05-22', '11:00', 'Rush ticket · 데이티켓 시도',         'https://www.nyphil.org',        'activity', null),
  ('res-totr',         'trip-ny-2026', 'ev-0522-4', 'place-totr',         'Top of the Rock',            'booked',       null,     '2026-05-22', '19:00', '예약 완료',                           null,                           'activity', null),
  ('res-jazzbar',      'trip-ny-2026', 'ev-0522-5', null,                 'Birdland Jazz Bar',          'booked',       null,     '2026-05-22', '22:30', '예약 완료',                           null,                           'activity', null),
  ('res-summit',       'trip-ny-2026', 'ev-0523-1', 'place-summit',       'Summit One Vanderbilt',      'needed',       null,     '2026-05-23', null,    null,                                 'https://www.summitov.com',      'activity', null),
  ('res-peterluger',   'trip-ny-2026', 'ev-0523-3', 'place-peterluger',   'Peter Luger Steak House',    'needed',       null,     '2026-05-23', '12:15', '현금만 가능 · 12:15부터 16:00 사이', 'https://www.peterluger.com',    'meal',     null),
  ('res-met',          'trip-ny-2026', 'ev-0524-1', 'place-met',          'MET Docent Tour',            'booked',       null,     '2026-05-24', '10:30', '도슨트 예약 완료',                    null,                           'activity', null),
  ('res-helicopter',   'trip-ny-2026', 'ev-0524-4', null,                 'FlyNYON Helicopter Tour',    'needed',       null,     '2026-05-24', '08:55', '08:55 탑승',                          'https://www.flynyon.com',       'activity', null),
  ('res-911',          'trip-ny-2026', 'ev-0525-5', 'place-911',          '9/11 Memorial & Museum',     'rush_attempt', null,     '2026-05-25', '17:00', '아침 7시 무료티켓 오픈 → 5시 입장',  null,                           'activity', null),
  ('res-oneworld',     'trip-ny-2026', 'ev-0525-6', null,                 'One World Observatory',      'booked',       null,     '2026-05-25', null,    null,                                 null,                           'activity', null),
  ('res-amtrak-dc',    'trip-ny-2026', 'ev-0526-1', null,                 'Amtrak NYC ↔ Washington',    'booked',       null,     '2026-05-26', null,    null,                                 null,                           'transport',null),
  ('res-vessel',       'trip-ny-2026', 'ev-0527-2', 'place-vessel',       'Vessel',                     'booked',       null,     '2026-05-27', null,    null,                                 null,                           'activity', null),
  ('res-musical',      'trip-ny-2026', 'ev-0527-4', null,                 'Broadway Musical — Lion King','rush_attempt', null,    '2026-05-27', '19:00', 'same-day rush 시도',                  null,                           'activity', null),
  ('res-amtrak-bos',   'trip-ny-2026', 'ev-0528-1', null,                 'Amtrak NYC → Boston',        'booked',       null,     '2026-05-28', '08:45', '08:45 출발 → 13:11 South Station',   null,                           'transport',null),
  ('res-fenway',       'trip-ny-2026', 'ev-0528-2', 'place-fenway',       'Boston — Fenway Park',       'needed',       null,     '2026-05-28', '16:10', null,                                 null,                           'activity', null),
  ('res-jetblue',      'trip-ny-2026', 'ev-0531-1', null,                 'JetBlue BOS → BUF',          'booked',       'GAGBEJ', '2026-05-31', '11:00', null,                                 null,                           'transport',null),
  ('res-rentalcar',    'trip-ny-2026', 'ev-0531-2', null,                 'Niagara Rental Car',         'booked',       null,     '2026-05-31', '13:00', '렌트카 온라인 체크인 필요',            null,                           'transport',null),
  ('res-niagaraboat',  'trip-ny-2026', 'ev-0531-5', null,                 'Niagara Boat Tour',          'booked',       null,     '2026-05-31', '17:00', '크록스 + 우비',                       null,                           'activity', null),
  ('res-winery',       'trip-ny-2026', 'ev-0601-2', null,                 'Peller Estate Winery',       'booked',       null,     '2026-06-01', '13:00', '10-15분 전 도착',                     null,                           'activity', null),
  ('res-jetboat',      'trip-ny-2026', 'ev-0601-3', null,                 'Niagara Jet Boat',           'booked',       null,     '2026-06-01', '15:00', '45분 전 도착 · 안전교육',             null,                           'activity', null),
  ('res-aa',           'trip-ny-2026', 'ev-0602-2', null,                 'American Airlines BUF → LGA','booked',       'LSVVZM','2026-06-02', '13:56', '13:56 → 15:19',                       null,                           'transport',null)
on conflict (id) do nothing;

-- events (subset — key days for initial seed)
insert into events (id, trip_id, city_id, event_date, start_time, title, description, category, status, priority, is_pinned, sort_order, place_id, reservation_id, deleted_at) values
  ('ev-0521-1','trip-ny-2026','city-ny1', '2026-05-21','22:30','Arrive JFK — Check in',          '에어프리미아 YP131 · 인천 21:25 출발',      'transit',  'upcoming','must_do',false,0,null,null,null),
  ('ev-0522-1','trip-ny-2026','city-ny1', '2026-05-22','11:00','NY Philharmonic',                 'Fri 22 May · 11:00 AM',                    'activity', 'upcoming','must_do',true, 0,'place-philharmonic','res-philharmonic',null),
  ('ev-0522-4','trip-ny-2026','city-ny1', '2026-05-22','19:00','Top of the Rock',                 '야경 · 예약 완료',                          'activity', 'upcoming','must_do',true, 3,'place-totr','res-totr',null),
  ('ev-0522-5','trip-ny-2026','city-ny1', '2026-05-22','22:30','Birdland Jazz Bar',               '예약 완료',                                 'activity', 'upcoming','high',  false,4,null,'res-jazzbar',null),
  ('ev-0523-1','trip-ny-2026','city-ny1', '2026-05-23',null,   'Summit One Vanderbilt',           null,                                       'activity', 'upcoming','must_do',true, 0,'place-summit','res-summit',null),
  ('ev-0523-3','trip-ny-2026','city-ny1', '2026-05-23','12:15','Peter Luger Steak House',         '현금만 가능 · 12:15–16:00 사이 입장',        'meal',     'upcoming','must_do',true, 2,'place-peterluger','res-peterluger',null),
  ('ev-0523-sun','trip-ny-2026','city-ny1','2026-05-23','20:20','Sunset',                         '브루클린 브릿지 감상 추천',                   'special',  'upcoming','high',  false,5,null,null,null),
  ('ev-0524-1','trip-ny-2026','city-ny1', '2026-05-24','10:30','MET — Docent Tour',               '메트로폴리탄 미술관 · 예약 완료',             'activity', 'upcoming','must_do',true, 0,'place-met','res-met',null),
  ('ev-0524-4','trip-ny-2026','city-ny1', '2026-05-24','20:55','FlyNYON Helicopter Tour',         '08:55 탑승 · 예약 필요',                    'activity', 'upcoming','must_do',true, 3,null,'res-helicopter',null),
  ('ev-0525-5','trip-ny-2026','city-ny1', '2026-05-25','17:00','9/11 Memorial & Museum',          '아침 7시 무료티켓 오픈 → 5시 입장',           'activity', 'upcoming','must_do',true, 4,'place-911','res-911',null),
  ('ev-0525-6','trip-ny-2026','city-ny1', '2026-05-25','19:00','One World Observatory',           '야경 · 예약 완료',                           'activity', 'upcoming','must_do',true, 5,null,'res-oneworld',null),
  ('ev-0526-1','trip-ny-2026','city-dc',  '2026-05-26',null,   'Washington DC Day Trip',          'Amtrak 왕복 · 셀프투어',                    'transit',  'upcoming','high',  false,0,null,'res-amtrak-dc',null),
  ('ev-0527-2','trip-ny-2026','city-ny1', '2026-05-27','11:00','High Line + Vessel + Little Island','스타벅스 로스터리',                        'leisure',  'upcoming','medium',false,1,'place-vessel','res-vessel',null),
  ('ev-0527-4','trip-ny-2026','city-ny1', '2026-05-27','19:00','Broadway Musical',                '라이온킹 · same-day rush 시도',              'activity', 'upcoming','must_do',true, 3,null,'res-musical',null),
  ('ev-0528-1','trip-ny-2026','city-boston','2026-05-28','08:45','Amtrak → Boston South Station','08:45 출발 → 13:11 도착',                   'transit',  'upcoming','must_do',false,0,null,'res-amtrak-bos',null),
  ('ev-0528-2','trip-ny-2026','city-boston','2026-05-28','16:10','Fenway Park',                   '보스턴 경기 · 예약 필요',                    'activity', 'upcoming','must_do',true, 1,'place-fenway','res-fenway',null),
  ('ev-0531-1','trip-ny-2026','city-niagara','2026-05-31','11:00','JetBlue BOS → BUF',           '11:00 → 12:35 · GAGBEJ',                   'transit',  'upcoming','must_do',false,0,null,'res-jetblue',null),
  ('ev-0531-5','trip-ny-2026','city-niagara','2026-05-31','17:00','Niagara Falls Boat Tour',      '크록스 신고 >.< (우비 각오!)',               'activity', 'upcoming','must_do',true, 4,null,'res-niagaraboat',null),
  ('ev-0601-2','trip-ny-2026','city-niagara','2026-06-01','13:00','Peller Estate Winery Tour',    '10-15분 전 도착 · 예약 완료',               'activity', 'upcoming','must_do',true, 1,null,'res-winery',null),
  ('ev-0601-3','trip-ny-2026','city-niagara','2026-06-01','15:00','Niagara Jet Boat',             '45분 전 도착 · 안전교육 · 예약 완료',        'activity', 'upcoming','must_do',true, 2,null,'res-jetboat',null),
  ('ev-0602-2','trip-ny-2026','city-ny2',  '2026-06-02','13:56','American Airlines BUF → LGA',   '13:56 → 15:19 · LSVVZM',                   'transit',  'upcoming','must_do',false,1,null,'res-aa',null),
  ('ev-0605-1','trip-ny-2026','city-ny2',  '2026-06-05','01:00','Depart JFK — 에어프리미아 YP132','01:00 출발 → 인천 귀국',                    'transit',  'upcoming','must_do',true, 0,null,null,null)
on conflict (id) do nothing;

-- checklist_items
insert into checklist_items (id, trip_id, title, category, is_checked, sort_order) values
  ('cl-01','trip-ny-2026','삼각대',                     'electronics',false,0),
  ('cl-02','trip-ny-2026','핸드폰 방수팩',               'electronics',false,1),
  ('cl-03','trip-ny-2026','크록스',                     'clothing',   false,2),
  ('cl-04','trip-ny-2026','지르텍 (공항 도착 후 먹기)', 'health',     false,3),
  ('cl-05','trip-ny-2026','초경량 돗자리',               'essential',  false,4),
  ('cl-06','trip-ny-2026','우산',                       'essential',  false,5),
  ('cl-07','trip-ny-2026','러닝벨트 + 호카 신발',       'clothing',   false,6),
  ('cl-08','trip-ny-2026','멀티탭',                     'electronics',false,7),
  ('cl-09','trip-ny-2026','밍이 렌즈 구매',             'electronics',false,8),
  ('cl-10','trip-ny-2026','환전 (스테이크 현금)',        'essential',  false,9),
  ('cl-11','trip-ny-2026','트래블월렛 카드 새로 발급',   'essential',  true, 10),
  ('cl-12','trip-ny-2026','렌트카 온라인 체크인',        'essential',  false,11),
  ('cl-13','trip-ny-2026','항공권 스마트 체크인',        'essential',  false,12)
on conflict (id) do nothing;

-- expenses
insert into expenses (id, trip_id, event_id, title, category, amount_estimated, amount_actual, currency, payment_method, expense_date) values
  ('ex-01','trip-ny-2026',null,         '항공권 (에어프리미아 왕복)',    'transport',    1800,null,'USD','card',null),
  ('ex-02','trip-ny-2026',null,         'Kimpton Era Hotel (7박)',      'accommodation',2100,null,'USD','card',null),
  ('ex-03','trip-ny-2026',null,         'YOTEL Boston (3박)',           'accommodation', 600,null,'USD','card',null),
  ('ex-04','trip-ny-2026',null,         'Oakes Hotel Niagara (2박)',    'accommodation', 400,null,'USD','card',null),
  ('ex-05','trip-ny-2026','ev-0523-3',  'Peter Luger Steak House',      'food',          200,null,'USD','cash','2026-05-23'),
  ('ex-06','trip-ny-2026',null,         'FlyNYON Helicopter Tour',      'activity',      300,null,'USD','card',null),
  ('ex-07','trip-ny-2026',null,         'Summit One Vanderbilt',        'activity',       50,null,'USD','card',null),
  ('ex-08','trip-ny-2026',null,         'Broadway Musical',             'activity',      120,null,'USD','card',null),
  ('ex-09','trip-ny-2026',null,         '식비 (일반)',                   'food',          800,null,'USD','card',null),
  ('ex-10','trip-ny-2026',null,         'Amtrak (NYC↔DC + NYC→BOS)',    'transport',     180,null,'USD','card',null),
  ('ex-11','trip-ny-2026',null,         '나이아가라 렌트카',             'transport',     150,null,'USD','card',null),
  ('ex-12','trip-ny-2026',null,         '쇼핑 / 기념품',                'shopping',      300,null,'USD','card',null),
  ('ex-13','trip-ny-2026',null,         'Peller Estate Winery Tour',    'activity',       80,null,'CAD','card',null),
  ('ex-14','trip-ny-2026',null,         'Niagara Jet Boat',             'activity',       90,null,'CAD','card',null),
  ('ex-15','trip-ny-2026',null,         '나이아가라 현지 식비',          'food',          120,null,'CAD','card',null),
  ('ex-16','trip-ny-2026',null,         '아이스와인 구매',               'shopping',       60,null,'CAD','cash',null)
on conflict (id) do nothing;

-- memories
insert into memories (id, trip_id, event_id, memory_date, song_title, song_artist, note) values
  ('mem-1','trip-ny-2026','ev-0523-3','2026-05-23','i like me better','lauv',null),
  ('mem-2','trip-ny-2026','ev-0524-1','2026-05-24','summer','volunteers','센트럴파크 자전거 타면서')
on conflict (id) do nothing;

-- reminders
insert into reminders (id, trip_id, title, body, recurrence, trigger_time, is_active) values
  ('rm-1','trip-ny-2026','Musical same-day rush',      '매일 13시, 19시 공연 시도',            'daily','10:00',true),
  ('rm-2','trip-ny-2026','Times Square Midnight Moment','매일 23:57–00:00 · 타임스퀘어에서',   'daily','23:30',true),
  ('rm-3','trip-ny-2026','뉴욕 일몰',                   '뉴욕 일몰 약 20:20',                  'daily','19:50',true),
  ('rm-4','trip-ny-2026','9/11 Museum 무료 티켓',       '아침 7시 온라인 오픈 → 5시 입장 목표','once', '07:00',true)
on conflict (id) do nothing;

-- transport_legs
insert into transport_legs (id, trip_id, type, carrier, confirmation_code, depart_at, arrive_at, depart_location, arrive_location, depart_timezone, arrive_timezone, notes) values
  ('tr-airf-in',  'trip-ny-2026','flight',    '에어프리미아','YP131', '2026-05-21T12:25:00Z','2026-05-21T02:30:00Z','인천 ICN','JFK New York',    'Asia/Seoul',        'America/New_York','YP131 · 21:25 ICN → 22:30 JFK'),
  ('tr-amtrak-dc','trip-ny-2026','train',     'Amtrak',      null,    '2026-05-26T10:00:00Z','2026-05-26T13:00:00Z','Penn Station NYC','Washington Union Station','America/New_York','America/New_York','NYC ↔ Washington DC 왕복'),
  ('tr-amtrak-bos','trip-ny-2026','train',    'Amtrak',      null,    '2026-05-28T12:45:00Z','2026-05-28T17:11:00Z','Penn Station NYC','Boston South Station',  'America/New_York','America/New_York','08:45 출발 → 13:11 도착'),
  ('tr-jetblue',  'trip-ny-2026','flight',    'JetBlue',     'GAGBEJ','2026-05-31T15:00:00Z','2026-05-31T16:35:00Z','BOS Boston','BUF Buffalo',           'America/New_York','America/New_York','11:00 → 12:35'),
  ('tr-rental',   'trip-ny-2026','rental_car',null,          null,    '2026-05-31T17:00:00Z','2026-06-02T15:00:00Z','BUF Airport','BUF Airport',          'America/New_York','America/New_York','나이아가라 · 반납 6/2 11:00'),
  ('tr-aa',       'trip-ny-2026','flight',    'American Airlines','LSVVZM','2026-06-02T17:56:00Z','2026-06-02T19:19:00Z','BUF Buffalo','LGA New York','America/New_York','America/New_York','13:56 → 15:19'),
  ('tr-airf-out', 'trip-ny-2026','flight',    '에어프리미아','YP132', '2026-06-05T05:00:00Z','2026-06-07T09:00:00Z','JFK New York','인천 ICN',           'America/New_York','Asia/Seoul',      'YP132 · 01:00 JFK 출발')
on conflict (id) do nothing;

-- day_meta (key dates)
insert into day_meta (id, trip_id, date, sunrise, sunset, day_note) values
  ('dm-0521','trip-ny-2026','2026-05-21','05:35','20:17','도착일 · 체크인 · 휴식'),
  ('dm-0522','trip-ny-2026','2026-05-22','05:34','20:18','필하모닉 · Top of the Rock · 재즈바'),
  ('dm-0523','trip-ny-2026','2026-05-23','05:33','20:19','브루클린 · Peter Luger · 야경'),
  ('dm-0524','trip-ny-2026','2026-05-24','05:32','20:20','MET 도슨트 · 센트럴파크 · 헬기투어'),
  ('dm-0525','trip-ny-2026','2026-05-25','05:32','20:21','다운타운 · 9/11 · One World'),
  ('dm-0526','trip-ny-2026','2026-05-26','05:31','20:21','워싱턴 DC 당일치기'),
  ('dm-0527','trip-ny-2026','2026-05-27','05:31','20:22','하이라인 · 루즈벨트 아일랜드 · 뮤지컬'),
  ('dm-0528','trip-ny-2026','2026-05-28','05:17','19:58','Amtrak → 보스턴 · 펜웨이파크'),
  ('dm-0529','trip-ny-2026','2026-05-29','05:16','19:59','하버드 · MIT · 찰스강'),
  ('dm-0530','trip-ny-2026','2026-05-30','05:16','20:00','Freedom Trail · 랍스터롤 · 노스엔드'),
  ('dm-0531','trip-ny-2026','2026-05-31','05:51','20:43','나이아가라 도착 · 유람선 · 선셋런'),
  ('dm-0601','trip-ny-2026','2026-06-01','05:51','20:44','온더레이크 · 와이너리 · 제트보트'),
  ('dm-0602','trip-ny-2026','2026-06-02','05:28','20:24','NY 복귀 · MLB 7시'),
  ('dm-0603','trip-ny-2026','2026-06-03','05:28','20:25','MoMA · 5번가 마무리'),
  ('dm-0604','trip-ny-2026','2026-06-04','05:28','20:25','SoHo · NYU · 출국 준비'),
  ('dm-0605','trip-ny-2026','2026-06-05','05:27','20:26','귀국 ✈ YP132 01:00')
on conflict (id) do nothing;
