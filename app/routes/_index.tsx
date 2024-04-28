import type { MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { transformData, type Dog } from '~/util/transform-data'
import { Layout } from '../layout'
import { Suspense } from 'react'
import LeafletMap from '~/components/leaflet-map.client'
import { Spinner } from '~/components/spinner/spinner'

export const meta: MetaFunction = () => {
  return [
    { title: 'Toronto Dangerous Dogs' },
    { name: 'description', content: 'Toronto dangerous dogs listing' },
  ]
}

export async function loader() {
  const packageId = 'dogs-issued-dangerous-dog-orders'

  try {
    const res = await fetch(
      `https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=${packageId}`
    )
    const data = await res.json()
    const activeIds: string[] = data.result.resources
      .filter(
        ({ datastore_active }: { datastore_active: boolean }) =>
          datastore_active
      )
      .map(({ id }: { id: string }) => id)

    const dogData: Dog[] = []
    for (const id of activeIds) {
      const res = await fetch(
        `https://ckan0.cf.opendata.inter.prod-toronto.ca/datastore/dump/${id}`
      )

      const text = await res.text()
      dogData.push(...transformData(text))
    }

    return dogData
  } catch (error) {
    console.error(error)
  }
}

export default function Index() {
  const data = useLoaderData<Dog[]>()

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <div className="flex flex-grow">
          <LeafletMap center={[43.71, -79.35]} zoom={11} />
        </div>

        <Outlet context={data} />
      </Suspense>
    </Layout>
  )
}
