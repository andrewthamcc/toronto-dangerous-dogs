import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Dog } from '~/types'
import { ToggleGroup } from '~/ui/toggle-group/toggle-group'
import { Select } from '~/ui/select/select'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export interface Ward {
  name: string
  number: string
  attacks: Dog[]
  byYear: { [key: string]: Dog[] }
  sortation: {
    string: number
  }
}

interface WardChartProps {
  wards: Ward[]
  years: string[]
}

export const WardsChart = ({ wards, years }: WardChartProps) => {
  const [selectedYear, setSelectedYear] = useState<string>('All')
  const options = [...years, 'All']

  useEffect(() => {}, [selectedYear])

  return (
    <div className="flex grow flex-col gap-4">
      <div className="flex flex-row justify-end">
        <div className="hidden md:block">
          <ToggleGroup
            selected={selectedYear}
            options={options}
            onChange={(year) => setSelectedYear(year)}
          />
        </div>
        <div className="block md:hidden">
          <Select
            selected={selectedYear}
            options={options}
            onChange={(year) => setSelectedYear(year)}
          />
        </div>
      </div>

      <div className="flex grow items-center">
        <Bar
          className="my-auto"
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            indexAxis: 'y',
            scales: {
              y: {
                grid: {
                  display: false,
                },
              },
              x: {
                ticks: {
                  precision: 0,
                },
              },
            },
          }}
          data={{
            labels: wards.map(({ name }) => name),
            datasets: [
              {
                label: '',
                data:
                  selectedYear !== 'All'
                    ? wards.map(({ byYear }) => byYear[selectedYear].length)
                    : wards.map(({ attacks }) => attacks.length),
                backgroundColor: '#165788',
              },
            ],
          }}
        />
      </div>
    </div>
  )
}
