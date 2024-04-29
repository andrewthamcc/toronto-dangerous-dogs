import { BreedsChart } from '~/components/breeds-chart'
import { Card } from '~/ui/card'
import { LocationsChart } from '~/components/locations-chart'
import { type Ward, WardsChart } from '~/components/wards-chart'
import { YearsChart } from '~/components/years-chart'
import { useDogs } from '~/root'
import { getStats } from '~/util/get-stats'

export default function Graphs() {
  const data = useDogs() ?? []

  const { wards, years, breeds, incidentLocations } = getStats(data)

  return (
    <div className="flex flex-col gap-4">
      <Card title="Attacks by ward">
        <WardsChart
          wards={wards as Ward[]}
          years={years.map(({ year }) => year.toString())}
        />
      </Card>

      <Card title={`Attacks by year`}>
        <YearsChart years={years} />
      </Card>

      <Card title="Attacks by breed">
        <BreedsChart {...breeds} />
      </Card>

      <Card title="Incident location">
        <LocationsChart
          {...incidentLocations}
          years={years.map(({ year }) => year.toString())}
        />
      </Card>
    </div>
  )
}
