'use client'

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { Author } from '../types/Author'

const geoUrl = "/world-countries.json"

interface WorldMapProps {
  authors: Author[]
  onSelectAuthor: (author: Author) => void
}

export default function WorldMap({ authors, onSelectAuthor }: WorldMapProps) {
  return (
    <div className="w-full h-[60vh] shadow-inner relative overflow-hidden border-y-4"
         style={{ backgroundColor: "hsl(var(--map-water))" }}
    >
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 250 }}
        style={{ width: "110%", height: "200%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                geography={geo}
                style={{
                  default: {
                    fill: "hsl(var(--map-land))",
                    stroke: "hsl(var(--map-border))",
                    outline: "none",
                  },
                  hover: {
                    fill: "hsl(var(--map-land))",
                    outline: "none",
                  },
                  pressed: {
                    fill: "hsl(var(--map-land))",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
        {authors.map((author) => (
          <Marker key={author.id} coordinates={author.coordinates}>
            <circle
              r={3}
              fill="hsl(var(--marker-base))"
              stroke="#fff"
              strokeWidth={1}
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => onSelectAuthor(author)}
              style={{ transition: 'all 0.2s ease-in-out' }}
            />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}