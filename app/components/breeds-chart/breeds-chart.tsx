import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { PolarArea } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

import { DogRecord } from '~/util/get-stats'

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
  return (
    <div>
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
              label: 'Breeds',
              data: Object.values(multiple),
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
        }}
      />
    </div>
  )
}
