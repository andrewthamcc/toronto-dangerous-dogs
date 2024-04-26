import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'Toronto Dangerous Dogs' },
    { name: 'description', content: 'Toronto dangerous dogs listing' },
  ]
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
     <h1>Dangerous dogs?</h1>
    </div>
  )
}
