import type { MetaFunction } from '@remix-run/node'
import { useSearchParams } from '@remix-run/react'
import { useDogs } from '~/root'
import { ClientOnly } from '~/ui/client-only'
import { Spinner } from '~/ui/spinner/spinner'
import { Map } from '~/components/map.client'
import { getWards } from '~/util/get-stats'
import type { Dog, Ward } from '~/types'
import { Ward as WardInfo } from '~/components/ward/ward'

export const meta: MetaFunction = () => {
  return [
    { title: 'Toronto Dangerous Dogs' },
    { name: 'description', content: 'Toronto dangerous dogs listing' },
  ]
}

export default function Index() {
  const data = useDogs() ?? []

  const [searchParams, setSearchParams] = useSearchParams()

  const wards = getWards(data as Dog[])
  const wardParam = searchParams.get('ward')

  return (
    <>
      <div className="flex flex-grow">
        <ClientOnly fallback={<Spinner />}>
          {() => (
            <Map
              center={[43.71, -79.35]}
              zoom={11}
              wardsData={wards as Ward[]}
            />
          )}
        </ClientOnly>
      </div>

      <WardInfo
        data={data.filter(({ Ward_Number }) => Ward_Number === wardParam)}
        isOpen={!!wardParam}
        onClose={() => setSearchParams()}
      />
    </>
  )
}
