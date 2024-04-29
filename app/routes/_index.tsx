import type { MetaFunction } from '@remix-run/node'
import { ClientOnly } from '~/ui/client-only'
import Map from '~/components/map.client'
import { Spinner } from '~/ui/spinner/spinner'

export const meta: MetaFunction = () => {
  return [
    { title: 'Toronto Dangerous Dogs' },
    { name: 'description', content: 'Toronto dangerous dogs listing' },
  ]
}

export default function Index() {
  return (
    <div className="flex flex-grow">
      <ClientOnly fallback={<Spinner />}>
        {() => <Map center={[43.71, -79.35]} zoom={11} />}
      </ClientOnly>
    </div>
  )
}
