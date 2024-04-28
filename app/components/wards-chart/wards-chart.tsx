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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export interface Ward {
  name: string
  number: string
  attacks: Dog[]
  total: number
  sortation: {
    string: number
  }
}

interface WardChartProps {
  wards: Ward[]
}

// add filters for years [2017 - present, all]
export const WardsChart = ({ wards }: WardChartProps) => {
  return (
    <Bar
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
        },
      }}
      data={{
        labels: wards.map(({ name }) => name),
        datasets: [
          {
            label: '',
            data: wards.map(({ total }) => total),
            backgroundColor: '#165788',
          },
        ],
      }}
    />
  )
}
