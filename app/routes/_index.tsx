import type { MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { transformData } from '~/util/transform-data'

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
    const resources = data.result.resources
    const activeIds = []

    for (const r in resources) {
      if (resources[r].datastore_active) activeIds.push(resources[r].id)
    }

    for (const id of activeIds) {
      const res = await fetch(
        `https://ckan0.cf.opendata.inter.prod-toronto.ca/datastore/dump/${id}`
      )

      const text = await res.text()
      return transformData(text)
    }
  } catch (error) {
    console.error(error)
  }
}

export default function Index() {
  const data = useLoaderData();

  return (
    <div>
      <h1>Dangerous dogs?</h1>
    </div>
  )
}
