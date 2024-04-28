import { useEffect, useState } from 'react'
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
import { Switch } from '~/ui/switch/switch'

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
  const [displayByKind, setDisplayByKind] = useState(false)
  const [graphData, setGraphData] = useState([
    {
      label: 'Total Attacks',
      data: years.map(({ total }) => total),
      backgroundColor: 'rgba(22, 87, 136, 1)',
      borderColor: 'rgba(22, 87, 136, 0.5)',
    },
  ])

  useEffect(() => {
    const categories = [
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
    ]

    if (displayByKind) setGraphData((prev) => [...categories])
    if (!displayByKind)
      setGraphData([
        {
          label: 'Total Attacks',
          data: years.map(({ total }) => total),
          backgroundColor: 'rgba(22, 87, 136, 1)',
          borderColor: 'rgba(22, 87, 136, 0.5)',
        },
      ])
  }, [displayByKind])

  return (
    <div className="flex grow flex-col gap-4">
      <div className="flex flex-row justify-end">
        <Switch
          id="year-toggle"
          checked={displayByKind}
          label="Display by kind"
          onChange={() => setDisplayByKind((prev) => !prev)}
        />
      </div>

      <div className="flex grow items-center">
        <Line
          options={{
            plugins: {
              legend: {
                display: displayByKind,
                align: 'end',
                labels: { boxHeight: 10, boxWidth: 10 },
              },
            },
            scales: {
              x: { grid: { display: false } },
              y: { beginAtZero: true },
            },
            elements: {
              point: {
                radius: 5,
                hoverRadius: 6,
              },
            },
          }}
          data={{
            labels: years.map(({ year }) => year),
            datasets: graphData,
          }}
        />
      </div>
    </div>
  )
}
