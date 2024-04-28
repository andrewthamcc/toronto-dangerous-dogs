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
import { DogRecord } from '~/util/get-stats'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface LocationsChartProps {
  locations: DogRecord
}

export const LocationsChart = ({ locations }: LocationsChartProps) => {
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
        labels: Object.keys(locations).map((l) => (l !== 'undefined' ? l : 'Unknown')),
        datasets: [
          {
            label: '',
            data: Object.values(locations),
            backgroundColor: '#165788',
          },
        ],
      }}
    />
  )
}
