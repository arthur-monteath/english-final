'use client'

import { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'
import { Author } from '../types/Author'

const geoUrl = '/world-countries.json'

interface WorldMapProps {
  authors: Author[]
  onSelectAuthor: (author: Author) => void
}

export default function WorldMap({ authors, onSelectAuthor }: WorldMapProps) {
  const [view, setView] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: [0, 0], // Center at [longitude, latitude]
    zoom: 1,
  })

  return (
    <div
      className="w-full h-[60vh] shadow-inner relative overflow-hidden border-y-4"
      style={{ backgroundColor: 'hsl(var(--map-water))' }}
    >
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 250 }}
        style={{ width: '110%', height: '200%' }}
      >
        <ZoomableGroup
          center={view.coordinates}
          zoom={view.zoom}
          minZoom={0.8}
          maxZoom={10}
          onMoveEnd={(pos) => setView(pos)}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: 'hsl(var(--map-land))',
                      stroke: 'hsl(var(--map-border))',
                      outline: 'none',
                    },
                    hover: { fill: 'hsl(var(--map-land))' },
                    pressed: { fill: 'hsl(var(--map-land))' },
                  }}
                />
              ))
            }
          </Geographies>

          {authors.map((author) => (
            <Marker key={author.id} coordinates={author.coordinates}>
              <circle
                r={3/view.zoom}
                fill="hsl(var(--marker-base))"
                stroke="#fff"
                strokeWidth={1/view.zoom}
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => onSelectAuthor(author)}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}
