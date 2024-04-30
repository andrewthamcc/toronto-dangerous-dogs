import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
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
import { Dog } from '~/types'
import { getWardStats } from '~/utils/getWardStats'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface WardProps {
  data: Dog[]
  isOpen: boolean
  onClose: () => void
  wardName: string
  wardNumber: string
}

export const Ward = ({
  data,
  isOpen,
  onClose,
  wardName,
  wardNumber,
}: WardProps) => {
  if (!isOpen) return null

  const { years, severity, sortingArea } = getWardStats(data)

  const codes = Object.keys(sortingArea)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                <div className="mb-4 flex flex-row justify-between">
                  <Dialog.Title as="h2" className="text-xl font-semibold">
                    Ward {wardNumber} {wardName}
                  </Dialog.Title>

                  <button
                    className="rounded-full h-6 w-6 fill-slate-400 p-1 transition-colors hover:bg-black/5"
                    onClick={onClose}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 19">
                      <g>
                        <path
                          d="M 14.66,14.24
           C 15.05,14.63 15.05,15.27 14.66,15.66
             14.66,15.66 14.66,15.66 14.66,15.66
             14.27,16.05 13.63,16.05 13.24,15.66
             13.24,15.66 3.34,5.76 3.34,5.76
             2.95,5.37 2.95,4.73 3.34,4.34
             3.34,4.34 3.34,4.34 3.34,4.34
             3.73,3.95 4.37,3.95 4.76,4.34
             4.76,4.34 14.66,14.24 14.66,14.24 Z
           M 13.24,4.34
           C 13.63,3.95 14.27,3.95 14.66,4.34
             14.66,4.34 14.66,4.34 14.66,4.34
             15.05,4.73 15.05,5.37 14.66,5.76
             14.66,5.76 4.76,15.66 4.76,15.66
             4.37,16.05 3.73,16.05 3.34,15.66
             3.34,15.66 3.34,15.66 3.34,15.66
             2.95,15.27 2.95,14.63 3.34,14.24
             3.34,14.24 13.24,4.34 13.24,4.34 Z"
                        />
                      </g>
                    </svg>
                  </button>
                </div>

                <div className="mt-2">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                      <h3 className="font-semibold text-toronto">Stats</h3>
                      <div className="my-2 w-full border-b-2 sm:w-11/12" />
                      <ul>
                        <li className="text-sm">
                          NAB:{' '}
                          <strong className="text-lg">{severity.nab}</strong>
                        </li>
                        <li className="text-sm">
                          Non-severe:{' '}
                          <strong className="text-lg">
                            {severity.nonSevere}
                          </strong>
                        </li>
                        <li className="text-sm">
                          Severe:{' '}
                          <strong className="text-lg">{severity.severe}</strong>
                        </li>
                        <li>
                          Total Attacks:{' '}
                          <strong className="text-lg text-red-500">
                            {data.length}
                          </strong>
                        </li>
                      </ul>
                    </div>

                    <div className="grow">
                      <h3 className="font-semibold text-toronto">
                        Attacks by postal code
                      </h3>
                      <div className="my-2 w-11/12 border-b-2" />
                      <table>
                        <thead>
                          <tr>
                            {codes.map((code) => (
                              <th
                                key="code"
                                className="border-2 px-2 py-1 text-sm"
                              >
                                {code}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {codes.map((code, i) => (
                              <td
                                key={`${code}-${i}`}
                                className="border-2 py-1 text-center text-xs"
                              >
                                {sortingArea[code]}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="w-full sm:w-1/3" />
                    <div className="grow">
                      <h3 className="font-semibold text-toronto">
                        Year by year
                      </h3>
                      <div className="my-2 w-11/12 border-b-2" />
                      <Line
                        className=""
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                          scales: {
                            x: { grid: { display: false } },
                            y: { beginAtZero: true, ticks: { precision: 0 } },
                          },
                          elements: {},
                        }}
                        data={{
                          labels: Object.keys(years),
                          datasets: [
                            {
                              label: 'Attacks',
                              data: Object.values(years).map(
                                (attacks) => attacks.length
                              ),
                              backgroundColor: 'rgba(22, 87, 136, 1)',
                              borderColor: 'rgba(22, 87, 136, 0.5)',
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    className="rounded-md border-2 border-toronto px-4 py-2 text-sm transition-colors hover:bg-toronto/70 hover:text-white"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
