import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Line, Radar } from 'react-chartjs-2'
import { ToggleGroup } from '~/ui/toggle-group/toggle-group'
import type { DogRecord, Severity } from '~/util/get-stats'
import type { Dog } from '~/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
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
  const severity = [
    { key: 'nab', label: 'NAB' },
    { key: 'nonSevere', label: 'Non-severe' },
    { key: 'severe', label: 'Severe' },
  ]

  return (
    <Radar
      className="my-auto max-h-[500px]"
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
        labels: Object.keys(bySeverity),
        datasets: severity.map(({ key, label }, i) => {
          return {
            label: label,
            data: Object.keys(bySeverity).map(
              (location) => bySeverity[location as keyof typeof Severity][key]
            ),
            backgroundColor: getColor(i, 0.5),
            borderColor: getColor(i, 0.5),
            borderWidth: 1,
          }
        }),
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

function getColor(index: number, opacity = 0.8) {
  switch (index) {
    case 0:
      return `rgba(255, 99, 132, ${opacity})`
    case 1:
      return `rgba(54, 162, 235, ${opacity})`
    case 2:
      return `rgba(255, 205, 86, ${opacity})`
    case 3:
      return `rgba(75, 192, 192, ${opacity})`
    case 4:
      return `rgba(153, 102, 255, ${opacity})`
    default:
      return `rgba(22, 87, 136, ${opacity})`
  }
}
