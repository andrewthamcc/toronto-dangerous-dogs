import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Line } from 'react-chartjs-2'
import { ToggleGroup } from '~/ui/toggle-group/toggle-group'
import type { DogRecord, Severity } from '~/util/get-stats'
import type { Dog } from '~/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface BySeverity {
  [key: string]: Severity
}

interface ByYear {
  [key: string]: {
    [key: string]: Dog[]
  }
}

interface LocationsChartProps {
  bySeverity: BySeverity
  byYear: ByYear
  locations: DogRecord
  years: string[]
}

const LOCATION_OPTIONS = ['Year', 'Severity', 'Location'] as const
type LocationOption = (typeof LOCATION_OPTIONS)[number]

export const LocationsChart = ({
  bySeverity,
  byYear,
  locations,
  years,
}: LocationsChartProps) => {
  const [selectedOption, setSelectedOption] =
    useState<LocationOption>('Location')

  return (
    <div className="flex grow flex-col gap-4">
      <div className="flex flex-row justify-end">
        <ToggleGroup
          selected={selectedOption}
          options={LOCATION_OPTIONS.slice()}
          onChange={(option) => setSelectedOption(option as LocationOption)}
        />
      </div>

      <div className="flex grow items-center">
        {selectedOption === 'Year' && <ByYear byYear={byYear} years={years} />}
        {selectedOption === 'Severity' && (
          <BySeverity bySeverity={bySeverity} />
        )}
        {selectedOption === 'Location' && <ByLocation locations={locations} />}
      </div>
    </div>
  )
}

const ByYear = ({ byYear, years }: { byYear: ByYear; years: string[] }) => {
  return (
    <Line
      className="my-auto"
      options={{
        plugins: {
          legend: {
            position: 'bottom',
            align: 'end',
            labels: { boxHeight: 10, boxWidth: 10 },
          },
        },
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        },
      }}
      data={{
        labels: years,
        datasets: Object.keys(byYear).map((location, i) => ({
          label: location,
          data: Object.keys(byYear[location]).map(
            (year) => byYear[location][year].length
          ),
          backgroundColor: getColor(i),
          borderColor: getColor(i),
        })),
      }}
    />
  )
}

const BySeverity = ({ bySeverity }: { bySeverity: BySeverity }) => {
  return (
    <Bar
      className="my-auto"
      options={{
        plugins: {
          legend: {
            position: 'bottom',
            align: 'end',
            labels: { boxHeight: 10, boxWidth: 10 },
          },
        },
        responsive: true,
        scales: {
          y: {
            grid: {
              display: false,
            },
          },
        },
      }}
      data={{
        labels: ['NAB', 'Non-Severe', 'Severe'],
        datasets: Object.keys(bySeverity).map((location, i) => ({
          label: location,
          data: Object.keys(bySeverity[location]).map(
            (severity) => bySeverity[location][severity]
          ),
          backgroundColor: getColor(i),
        })),
      }}
    />
  )
}

const ByLocation = ({ locations }: { locations: DogRecord }) => {
  return (
    <Bar
      className="my-auto"
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        scales: {
          y: {
            grid: {
              display: false,
            },
          },
        },
      }}
      data={{
        labels: Object.keys(locations).map((l) =>
          l !== 'undefined' ? l : 'Unknown'
        ),
        datasets: [
          {
            label: '',
            data: Object.values(locations),
            backgroundColor: 'rgba(22, 87, 136, 1)',
            hoverBackgroundColor: 'rgba(22, 87, 136, 0.7)',
          },
        ],
      }}
    />
  )
}

function getColor(index: number) {
  switch (index) {
    case 1:
      return 'rgba(255, 99, 132, 0.8)'
    case 2:
      return 'rgba(54, 162, 235, 0.8)'
    case 3:
      return 'rgba(255, 205, 86, 0.8)'
    case 4:
      return 'rgba(75, 192, 192, 0.8)'
    case 5:
      return 'rgba(153, 102, 255, 0.8)'
    default:
      return 'rgba(22, 87, 136, 0.8)'
  }
}
