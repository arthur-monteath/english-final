'use client'

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { Author } from '../types/Author'

interface WorldMapProps {
  authors: Author[]
  onSelectAuthor: (author: Author) => void
}

export default function WorldMap({ authors, onSelectAuthor }: WorldMapProps) {
  return (
    <div className="w-full h-[60vh] bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 160 }} 
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={'/world-countries.json'}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        {authors.map((author) => (
          <Marker key={author.id} coordinates={author.coordinates}>
            <circle
              r={5}
              fill="#F00"
              stroke="#fff"
              strokeWidth={2}
              className="cursor-pointer hover:scale-110 transition-transform"
              onClick={() => onSelectAuthor(author)}
            />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}
