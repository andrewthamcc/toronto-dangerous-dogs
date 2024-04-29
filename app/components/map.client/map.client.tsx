import { useState, PropsWithChildren } from 'react'
import { useSearchParams } from '@remix-run/react'
import { GeoJSON, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { type MapOptions } from 'leaflet'
import wards from '~/data/wards.json'
import type { Ward } from '~/types'

interface LeafletMapProps extends PropsWithChildren, MapOptions {
  center: [number, number]
  zoom?: number
  wardsData: Ward[]
}

export const Map = ({ center, zoom, wardsData, ...props }: LeafletMapProps) => {
  const [popupData, setPopupData] = useState({
    number: '',
    name: '',
    attacks: 0,
  })

  const [_, setSearchParams] = useSearchParams()

  return (
    <MapContainer
      className="w-full flex-grow"
      center={center}
      maxZoom={16}
      zoom={zoom}
      {...props}
    >
      <GeoJSON
        data={wards.features}
        onEachFeature={(feature, layer) => {
          const name = feature.properties.AREA_NAME
          const wardNumber = feature.properties.AREA_SHORT_CODE

          const ward = wardsData.find(({ number }) => number === wardNumber)

          layer.on({
            popupclose: () => {
              setPopupData({ number: '', name: '', attacks: 0 })
            },
            click: () => {
              setPopupData({
                name,
                number: wardNumber,
                attacks: ward?.attacks.length ?? 0,
              })
            },
            mouseover: (e) => {
              e.target.setStyle({
                fillColor: '#165788',
              })
            },
            mouseout: (e) => e.target.setStyle({ fillColor: 'transparent' }),
          })
        }}
        style={() => ({
          fillColor: 'transparent',
          color: '#165788',
        })}
      >
        <Popup>
          <div className="flex flex-col items-center">
            <p className="!m-0 text-center font-semibold">{popupData.name}</p>
            <p className="!m-0 text-center">Ward {popupData.number}</p>

            <p className="!my-1">
              Total Attacks: <strong>{popupData.attacks}</strong>
            </p>

            <button
              className="mt-2 rounded-md bg-toronto px-2 py-1 text-white"
              onClick={() => setSearchParams({ ward: popupData.number })}
            >
              More Info
            </button>
          </div>
        </Popup>
      </GeoJSON>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
    </MapContainer>
  )
}
