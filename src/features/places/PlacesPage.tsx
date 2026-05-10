'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { dbMarkPlaceVisited, dbToggleFavorite } from '@/lib/supabase/writes'

const CITY_LABELS: Record<string, string> = {
  'city-ny1':     'New York',
  'city-dc':      'DC',
  'city-boston':  'Boston',
  'city-niagara': 'Niagara',
  'city-ny2':     'New York',
}

export function PlacesPage() {
  const places       = useAppStore(s => s.places ?? [])
  const markVisited  = useAppStore(s => s.markPlaceVisited)
  const toggleFav    = useAppStore(s => s.toggleFavorite)
  const [cityFilter, setCityFilter] = useState<string>('all')
  const [favOnly,    setFavOnly]    = useState(false)

  const activePlaces = places.filter(p => !p.deletedAt)
  const cities = [...new Set(activePlaces.map(p => p.cityId))]

  const shown = activePlaces.filter(p => {
    if (cityFilter !== 'all' && p.cityId !== cityFilter) return false
    if (favOnly && !p.favorite) return false
    return true
  })

  return (
    <div className="bg-[#FAFAF8] min-h-screen flex flex-col">
      <header className="bg-white border-b border-[#EDEAE4] px-4 pt-[56px] pb-3 sticky top-0 z-10">
        <div className="flex justify-between items-baseline mb-3">
          <h1 className="text-[18px] font-bold text-[#1A1714] tracking-[-0.03em]">Places</h1>
          <button
            onClick={() => setFavOnly(v => !v)}
            className={`flex items-center gap-[4px] text-[10px] font-semibold px-[9px] py-[3px] rounded-full border-none cursor-pointer transition-colors ${
              favOnly ? 'bg-[#FEF6E4] text-[#7A4F00]' : 'bg-[#F5F2EC] text-[#5C5550]'
            }`}
          >
            <i className={`ti ${favOnly ? 'ti-heart-filled' : 'ti-heart'} text-[10px]`} aria-hidden="true" />
            Favorites
          </button>
        </div>
        <div className="flex gap-[5px] overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setCityFilter('all')}
            className={`flex-shrink-0 text-[10px] font-semibold px-[9px] py-[3px] rounded-full border-none cursor-pointer transition-colors ${cityFilter === 'all' ? 'bg-[#1A1714] text-white' : 'bg-[#F5F2EC] text-[#5C5550]'}`}
          >All</button>
          {cities.map(cid => (
            <button
              key={cid}
              onClick={() => setCityFilter(cid)}
              className={`flex-shrink-0 text-[10px] font-semibold px-[9px] py-[3px] rounded-full border-none cursor-pointer transition-colors ${cityFilter === cid ? 'bg-[#1A1714] text-white' : 'bg-[#F5F2EC] text-[#5C5550]'}`}
            >
              {CITY_LABELS[cid] ?? cid}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 px-4 pt-3 pb-6">
        {shown.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <i className="ti ti-map-pin-off text-[28px] text-[#E8E4DE] mb-2" aria-hidden="true" />
            <p className="text-[12px] text-[#B0AAA3]">No places found</p>
          </div>
        ) : (
          <div className="rounded-[14px] overflow-hidden border border-[#EDEAE4] bg-white">
            {shown.map((place, idx) => {
              const isLast = idx === shown.length - 1
              const mapsHref = place.googleMapsUrl
                ?? (place.address ? `https://maps.google.com/?q=${encodeURIComponent(place.address)}` : null)

              return (
                <div
                  key={place.id}
                  className={`flex items-start gap-3 px-[14px] py-[11px] ${!isLast ? 'border-b border-[#EDEAE4]' : ''}`}
                >
                  {/* Visited toggle */}
                  <button
                    onClick={() => {
                    markVisited(place.id, !place.visited)
                    void dbMarkPlaceVisited(
                      place.id,
                      !place.visited,
                      !place.visited ? new Date().toISOString() : null
                    )
                  }}
                    className={`mt-[1px] w-[18px] h-[18px] rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-150 border-none cursor-pointer ${
                      place.visited ? 'bg-[#1A1714]' : 'border border-[#D0CCC6] bg-white'
                    }`}
                    style={{ border: place.visited ? 'none' : '1px solid #D0CCC6' }}
                    aria-label={place.visited ? 'Mark unvisited' : 'Mark visited'}
                  >
                    {place.visited && <i className="ti ti-check text-[10px] text-white" aria-hidden="true" />}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-[12px] font-semibold leading-[1.3] mb-[2px] ${place.visited ? 'text-[#B0AAA3] line-through' : 'text-[#1A1714]'}`}>
                      {place.name}
                    </p>
                    {place.address && (
                      <p className="text-[10px] text-[#B0AAA3] leading-[1.3] mb-[2px] truncate">{place.address}</p>
                    )}
                    {place.openingHours && (
                      <p className="text-[10px] text-[#B0AAA3]">
                        <i className="ti ti-clock text-[10px] mr-[2px]" aria-hidden="true" />
                        {place.openingHours}
                      </p>
                    )}
                    {place.notes && (
                      <p className="text-[10px] text-[#B0AAA3] mt-[2px] leading-[1.4]">{place.notes}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-[8px] flex-shrink-0 mt-[1px]">
                    <button
                      onClick={() => {
                    toggleFav(place.id)
                    void dbToggleFavorite(place.id, !place.favorite)
                  }}
                      className="border-none bg-transparent cursor-pointer p-0"
                      aria-label={place.favorite ? 'Remove favorite' : 'Add favorite'}
                    >
                      <i
                        className={`ti ${place.favorite ? 'ti-heart-filled' : 'ti-heart'} text-[15px] transition-colors`}
                        style={{ color: place.favorite ? '#E8903A' : '#D0CCC6' }}
                        aria-hidden="true"
                      />
                    </button>
                    {mapsHref && (
                      <a href={mapsHref} target="_blank" rel="noopener noreferrer" aria-label="Open in Maps">
                        <i className="ti ti-map-pin text-[15px] text-[#D0CCC6] hover:text-[#8A8480] transition-colors" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
