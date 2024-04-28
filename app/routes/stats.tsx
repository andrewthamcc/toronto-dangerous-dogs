import { BreedsChart } from '~/components/breeds-chart'
import { Card } from '~/components/card'
import { LocationsChart } from '~/components/locations-chart'
import { type Ward, WardsChart } from '~/components/wards-chart'
import { YearsChart } from '~/components/years-chart'
import { useDogs } from '~/root'
import { getStats } from '~/util/get-stats'

export default function Stats() {
  const data = useDogs() ?? []

  const { wards, years, breeds, incidentLocations } = getStats(data)

  return (
    <div className="flex flex-col gap-6">
      <Card title="Wards">
        <WardsChart wards={wards as Ward[]} />
      </Card>

      <Card title="Years">
        <YearsChart years={years} />
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card title="Breeds">
          <BreedsChart {...breeds} />
        </Card>

        <Card title="Incident location">
          <LocationsChart locations={incidentLocations} />
        </Card>
      </div>
    </div>
  )
}
