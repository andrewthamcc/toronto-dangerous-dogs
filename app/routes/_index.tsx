import type { MetaFunction } from '@remix-run/node'
import LeafletMap from '~/components/leaflet-map.client'
import { useDogs } from '~/root'

export const meta: MetaFunction = () => {
  return [
    { title: 'Toronto Dangerous Dogs' },
    { name: 'description', content: 'Toronto dangerous dogs listing' },
  ]
}

export default function Index() {
  const data = useDogs()

  return (
    <div className="flex flex-grow">
      <LeafletMap center={[43.71, -79.35]} zoom={11} />
    </div>
  )
}
