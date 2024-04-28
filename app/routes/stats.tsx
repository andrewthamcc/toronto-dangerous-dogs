import { Card } from '~/components/card'
import { useDogs } from '~/root'
import { getStats } from '~/util/get-stats'

export default function Stats() {
  const data = useDogs() ?? []

  const { wards, years, breeds, incidentLocations } = getStats(data)

  return (
    <div className="flex flex-col gap-6">
      <Card title="Wards">
        <p>Wards</p>
      </Card>

      <Card title="Breeds">
        <p>Breed</p>
      </Card>

      <Card title="Years">
        <p>Year</p>
      </Card>

      <Card title="Incident location">
        <p>Location</p>
      </Card>
    </div>
  )
}
