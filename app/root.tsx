import { Suspense } from 'react'
import {
  Links,
  Outlet,
  Scripts,
  Meta,
  ScrollRestoration,
  useLoaderData,
  NavLink,
  useRouteLoaderData,
  redirect,
} from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import stylesheet from '~/tailwind.css?url'
import 'leaflet/dist/leaflet.css'
import { Layout as RouteLayout } from '~/layout'
import { Spinner } from '~/ui/spinner/spinner'
import { transformData } from '~/util/transform-data'
import { Dog } from '~/types'
import clsx from 'clsx'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RouteLayout>{children}</RouteLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
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

const TABS = [
  {
    to: '/',
    label: 'Map',
  },
  {
    to: '/stats',
    label: 'Stats',
  },
  {
    to: '/data',
    label: 'Data',
  },
]

export default function App() {
  const data = useLoaderData()

  return (
    <Suspense fallback={<Spinner />}>
      <nav>
        <ul className="mb-4 flex flex-row gap-4 border-b-[1px]">
          {TABS.map(({ label, to }) => (
            <li className="flex" key={to}>
              <NavLink className="px-4 py-2" to={to}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet context={data} />
    </Suspense>
  )
}

export function useDogs() {
  return useRouteLoaderData<Dog[]>('root')
}
