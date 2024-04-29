import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { PolarArea } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
)

import { DogRecord } from '~/util/get-stats'
import { Switch } from '~/ui/switch/switch'

interface BreedsChartProps {
  breeds: DogRecord
  consolodated: DogRecord
  multiple: DogRecord
}

export const BreedsChart = ({
  breeds,
  consolodated,
  multiple,
}: BreedsChartProps) => {
  const [displayMultiple, setDisplayMultiple] = useState(true)

  return (
    <div className="flex grow flex-col gap-4">
      <div className="flex flex-row justify-end">
        <Switch
          id="breed-toggle"
          checked={displayMultiple}
          label="Breeds with 5 or more bites"
          onChange={() => setDisplayMultiple((prev) => !prev)}
        />
      </div>

      <div className="flex grow items-center">
        {displayMultiple ? (
          <PolarArea
            className="max-h-[500px]"
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              responsive: true,
            }}
            data={{
              labels: Object.keys(multiple),
              datasets: [
                {
                  label: 'Bites',
                  data: Object.values(multiple),
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 205, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(22, 87, 136, 0.8)',
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        ) : (
          <Bar
            className="my-auto"
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              responsive: true,
            }}
            data={{
              labels: Object.keys(consolodated),
              datasets: [
                {
                  label: 'Bites',
                  data: Object.values(consolodated),
                  backgroundColor: 'rgba(22, 87, 136, 1)',
                  hoverBackgroundColor: 'rgba(22, 87, 136, 0.7)',
                },
              ],
            }}
          />
        )}
      </div>
    </div>
  )
}
