import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface Year {
  nab: number
  nonSevere: number
  severe: number
  year: number
  total: number
}

interface YearsChartProps {
  years: Year[]
}

export const YearsChart = ({ years }: YearsChartProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div></div>

      <Line
        options={{
          plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false } } },
          elements: {
            point: {
              radius: 5,
              hoverRadius: 6,
            },
          },
        }}
        data={{
          labels: years.map(({ year }) => year),
          datasets: [
            {
              label: 'Total Attacks',
              data: years.map(({ total }) => total),
              backgroundColor: 'rgba(22, 87, 136, 1)',
              borderColor: 'rgba(22, 87, 136, 0.5)',
            },
            {
              label: 'NAB',
              data: years.map(({ nab }) => nab),
              backgroundColor: 'rgba(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
              label: 'Non-severe',
              data: years.map(({ nonSevere }) => nonSevere),
              backgroundColor: 'rgba(255, 206, 86)',
              borderColor: 'rgba(255, 206, 86, 0.5)',
            },
            {
              label: 'Severe',
              data: years.map(({ severe }) => severe),
              backgroundColor: 'rgba(255, 99, 100)',
              borderColor: 'rgba(255, 99, 100, 0.5)',
            },
          ],
        }}
      />
    </div>
  )
}
