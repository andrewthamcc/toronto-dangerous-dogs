import { useState } from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { PolarArea } from 'react-chartjs-2'
import { Pie } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

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

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
  }

  const data = {
    labels: Object.keys(displayMultiple ? multiple : consolodated),
    datasets: [
      {
        label: 'Breeds',
        data: Object.values(displayMultiple ? multiple : consolodated),
        backgroundColor: [
          'rgba(31, 129, 204, 0.5)',
          'rgba(255, 99, 100, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="flex grow flex-col gap-4">
      <div className="flex flex-row justify-end">
        <Switch
          id="breed-toggle"
          checked={displayMultiple}
          label="Display breeds with 3 or more bites"
          onChange={() => setDisplayMultiple((prev) => !prev)}
        />
      </div>

      <div className="flex grow items-center">
        {displayMultiple ? (
          <PolarArea options={options} data={data} className="max-h-[500px]" />
        ) : (
          <Pie options={options} data={data} className="max-h-[500px]" />
        )}
      </div>
    </div>
  )
}
