-- ============================================================
-- Travel Planner — Supabase Schema
-- AppState 타입과 1:1 매핑 (camelCase → snake_case)
-- ============================================================

-- ── trips ────────────────────────────────────────────────────
create table if not exists trips (
  id               text        primary key,          -- 'trip-ny-2026'
  title            text        not null,
  start_date       date        not null,
  end_date         date        not null,
  cover_image_url  text,
  status           text        not null default 'planning',
  created_by       text        not null default 'user-yj',
  created_at       timestamptz not null default now()
);

-- ── cities ───────────────────────────────────────────────────
create table if not exists cities (
  id           text    primary key,
  trip_id      text    not null references trips(id) on delete cascade,
  name         text    not null,
  country      text    not null default 'US',
  arrive_date  date    not null,
  depart_date  date    not null,
  sort_order   integer not null default 0
);

-- ── day_meta ─────────────────────────────────────────────────
create table if not exists day_meta (
  id               text    primary key,
  trip_id          text    not null references trips(id) on delete cascade,
  date             date    not null,
  sunrise          text,
  sunset           text,
  weather_summary  text,
  day_note         text,
  unique(trip_id, date)
);

-- ── places ───────────────────────────────────────────────────
create table if not exists places (
  id               text    primary key,
  trip_id          text    not null references trips(id) on delete cascade,
  city_id          text    not null references cities(id),
  name             text    not null,
  address          text,
  google_place_id  text,
  google_maps_url  text,
  website_url      text,
  opening_hours    text,
  notes            text,
  category         text    not null default 'activity',
  lat              numeric,
  lng              numeric,
  visited          boolean not null default false,
  visited_at       timestamptz,
  favorite         boolean not null default false,
  deleted_at       timestamptz
);

-- ── reservations ─────────────────────────────────────────────
create table if not exists reservations (
  id                  text    primary key,
  trip_id             text    not null references trips(id) on delete cascade,
  event_id            text,
  place_id            text    references places(id),
  title               text    not null,
  status              text    not null default 'needed',
  confirmation_code   text,
  reservation_date    date,
  reservation_time    text,
  notes               text,
  booking_url         text,
  category            text    not null default 'activity',
  deleted_at          timestamptz
);

-- ── events ───────────────────────────────────────────────────
create table if not exists events (
  id              text    primary key,
  trip_id         text    not null references trips(id) on delete cascade,
  city_id         text    not null references cities(id),
  event_date      date    not null,
  start_time      text,
  title           text    not null,
  description     text,
  category        text    not null default 'activity',
  status          text    not null default 'upcoming',
  priority        text    not null default 'medium',
  is_pinned       boolean not null default false,
  sort_order      integer not null default 0,
  place_id        text    references places(id),
  reservation_id  text    references reservations(id),
  deleted_at      timestamptz
);

-- ── transport_legs ───────────────────────────────────────────
create table if not exists transport_legs (
  id                text    primary key,
  trip_id           text    not null references trips(id) on delete cascade,
  type              text    not null default 'flight',
  carrier           text,
  confirmation_code text,
  depart_at         timestamptz not null,
  arrive_at         timestamptz not null,
  depart_location   text    not null,
  arrive_location   text    not null,
  depart_timezone   text,
  arrive_timezone   text,
  notes             text
);

-- ── checklist_items ──────────────────────────────────────────
create table if not exists checklist_items (
  id          text    primary key,
  trip_id     text    not null references trips(id) on delete cascade,
  title       text    not null,
  category    text    not null default 'essential',
  is_checked  boolean not null default false,
  checked_by  text,
  sort_order  integer not null default 0
);

-- ── expenses ─────────────────────────────────────────────────
create table if not exists expenses (
  id                text    primary key,
  trip_id           text    not null references trips(id) on delete cascade,
  event_id          text    references events(id),
  title             text    not null,
  category          text    not null default 'other',
  amount_estimated  numeric,
  amount_actual     numeric,
  currency          text    not null default 'USD',
  payment_method    text    not null default 'card',
  expense_date      date
);

-- ── memories ─────────────────────────────────────────────────
create table if not exists memories (
  id           text    primary key,
  trip_id      text    not null references trips(id) on delete cascade,
  event_id     text    references events(id),
  memory_date  date    not null,
  song_title   text,
  song_artist  text,
  note         text
);

-- ── reminders ────────────────────────────────────────────────
create table if not exists reminders (
  id            text    primary key,
  trip_id       text    not null references trips(id) on delete cascade,
  title         text    not null,
  body          text,
  recurrence    text    not null default 'once',
  trigger_time  text,
  is_active     boolean not null default true
);

-- ── Row Level Security (공개 read, 나중에 Auth 추가) ──────────
alter table trips           enable row level security;
alter table cities          enable row level security;
alter table day_meta        enable row level security;
alter table places          enable row level security;
alter table reservations    enable row level security;
alter table events          enable row level security;
alter table transport_legs  enable row level security;
alter table checklist_items enable row level security;
alter table expenses        enable row level security;
alter table memories        enable row level security;
alter table reminders       enable row level security;

-- 임시 정책: 전체 read 허용 (Google Auth 연동 후 교체)
create policy "allow_read_all" on trips           for select using (true);
create policy "allow_read_all" on cities          for select using (true);
create policy "allow_read_all" on day_meta        for select using (true);
create policy "allow_read_all" on places          for select using (true);
create policy "allow_read_all" on reservations    for select using (true);
create policy "allow_read_all" on events          for select using (true);
create policy "allow_read_all" on transport_legs  for select using (true);
create policy "allow_read_all" on checklist_items for select using (true);
create policy "allow_read_all" on expenses        for select using (true);
create policy "allow_read_all" on memories        for select using (true);
create policy "allow_read_all" on reminders       for select using (true);

-- write 정책도 임시 허용 (Auth 연동 전까지)
create policy "allow_write_all" on trips           for all using (true);
create policy "allow_write_all" on cities          for all using (true);
create policy "allow_write_all" on day_meta        for all using (true);
create policy "allow_write_all" on places          for all using (true);
create policy "allow_write_all" on reservations    for all using (true);
create policy "allow_write_all" on events          for all using (true);
create policy "allow_write_all" on transport_legs  for all using (true);
create policy "allow_write_all" on checklist_items for all using (true);
create policy "allow_write_all" on expenses        for all using (true);
create policy "allow_write_all" on memories        for all using (true);
create policy "allow_write_all" on reminders       for all using (true);
