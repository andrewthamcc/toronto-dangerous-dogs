import type { MapOptions } from 'leaflet'
import { PropsWithChildren } from 'react'
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet'
import wards from '../../data/wards.json'

interface LeafletMapProps extends PropsWithChildren, MapOptions {
  center: [number, number]
  zoom?: number
}

export const LeafletMap = ({ ...props }: LeafletMapProps) => {
  return (
    <MapContainer className="w-full flex-grow" maxZoom={16} {...props}>
      <GeoJSON
        data={wards.features}
        onEachFeature={(feature, layer) => {}}
        style={{
          color: '#165788',
          fillColor: 'none',
          weight: 2,
        }}
      />
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
    </MapContainer>
  )
}
