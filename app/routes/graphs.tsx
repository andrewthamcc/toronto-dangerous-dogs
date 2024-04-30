import { useDogs } from '~/root'
import { Card } from '~/ui/card'
import { WardsChart } from '~/components/wards-chart'
import { YearsChart } from '~/components/years-chart'
import { BreedsChart } from '~/components/breeds-chart'
import { LocationsChart } from '~/components/locations-chart'
import { getVisualizationStats } from '~/utils/getVisualizationStats'
import { Ward } from '~/types'

export default function Graphs() {
  const data = useDogs() ?? []

  console.log(data.filter(({ Breed }) => Breed && Breed.startsWith('GOLD')))

  const { wards, years, breeds, incidentLocations } =
    getVisualizationStats(data)

  return (
    <div className="flex flex-col gap-4">
      <Card title="Attacks by ward">
        <WardsChart
          wards={wards as Ward[]}
          years={years.map(({ year }) => year.toString())}
        />
      </Card>

      <Card
        title="Attacks by year"
        info={
          <div className="flex flex-col gap-2">
            <p>
              Attacks are classified with different scales and data was collated
              into one format.
            </p>
            <ul className="ml-[1rem] list-disc">
              <li>NAB (non-aggressive bite) - Level 0</li>
              <li>Non-severe - Levels 1 - 2</li>
              <li>Severe - Levels 3 - 5</li>
            </ul>

            <a
              className="text-xs font-semibold hover:underline"
              href="https://www.toronto.ca/community-people/animals-pets/pets-in-the-city/dogs-in-the-city/dog-bites-or-attacks/"
              rel="noopener noreferrer"
              target="_blank"
            >
              See more
            </a>
          </div>
        }
      >
        <YearsChart years={years} />
      </Card>

      <Card
        title="Attacks by breed"
        info={
          <div className="flex flex-col gap-2">
            <p>
              Data was colated for any mixed breed into their primary listed
              breed. The primary breed being the first listed breed.
            </p>

            <div className="flex gap-2 text-xs">
              <p>Eg.</p>
              <div>
                <ul className="mb-1 ml-[1rem] list-disc">
                  <li>GERM SHEPHERD MIX</li>
                  <li>GERM SHEPHERD / LABRADOR RETR</li>
                  <li>GOLDEN RETR / GERM SHEPHERD</li>
                </ul>
                <p className="text-xs">
                  The first two listed dogs are categorized as{' '}
                  <em>GERM SHEPHRED MIX</em> and the third as{' '}
                  <em>GOLDEN RETR MIX</em>.
                </p>
              </div>
            </div>
          </div>
        }
      >
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
