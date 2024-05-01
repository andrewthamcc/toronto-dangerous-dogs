import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { useDogs } from '~/root'
import DatabaseIcon from '~/assets/database.svg'
import { ToggleGroup } from '~/ui/toggle-group/toggle-group'
import { columns } from './columns'

export default function Data() {
  const dogs = useDogs()
  const [data] = useState(() => dogs ?? [])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return (
    <div className="flex flex-col gap-2">
      <h2>
        Raw data from the registry of dogs subjected to and issued a dangerous
        dog order.
      </h2>

      <div className="mb-2 flex items-center">
        <img src={DatabaseIcon} aria-hidden className="mr-1 inline h-4 w-4" />
        <a
          className="inline items-center font-semibold hover:underline"
          href="https://open.toronto.ca/dataset/dogs-issued-dangerous-dog-orders/"
          target="_blank"
          rel="noreferrer"
        >
          Toronto open data
        </a>
      </div>

      <table className="border-2 shadow-md mb-1">
        <thead>
          <tr>
            {table.getFlatHeaders().map((header) => (
              <th className="border-2 px-2" key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr
              className={`text-sm ${i % 2 ? 'bg-slate-100' : ''}`}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td className="border-2 px-2" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-2 flex flex-row items-start justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor="row-count" className="text-sm">
            Rows:
          </label>
          <ToggleGroup
            id="row-count"
            selected={table.getState().pagination.pageSize.toString()}
            options={['10', '25', '50', '100']}
            onChange={(size) => {
              table.setPageSize(Number(size))
            }}
          />
        </div>

        <div>
          <PageControl
            className="rounded-l-md border-r-0 px-2"
            disabled={!table.getCanPreviousPage()}
            label="≪"
            onClick={() => table.firstPage()}
          />
          <PageControl
            className="border-r-0"
            disabled={!table.getCanPreviousPage()}
            label="Previous"
            onClick={() => table.previousPage()}
          />
          <PageControl
            disabled={!table.getCanNextPage()}
            label="Next"
            onClick={() => table.nextPage()}
          />
          <PageControl
            className="rounded-r-md border-l-0 px-2"
            disabled={!table.getCanNextPage()}
            label="≫"
            onClick={() => table.lastPage()}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm">
          Showing{' '}
          <strong>{table.getRowModel().rows.length.toLocaleString()}</strong> of{' '}
          <strong>{table.getRowCount().toLocaleString()}</strong> Rows
        </p>

        <div className="flex flex-row items-center gap-2">
          <label className="text-sm">Go to page: </label>
          <input
            className="w-[70px] appearance-none rounded-md border-2 px-2 py-1 outline-none"
            type="number"
            max={table.getPageCount()}
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
          />

          <p className="text-right text-sm">
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{' '}
            <strong>{table.getPageCount().toLocaleString()}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

interface PageControlProps {
  className?: string
  disabled: boolean
  label: string
  onClick: () => void
}

const PageControl = ({
  className,
  disabled,
  label,
  onClick,
}: PageControlProps) => (
  <button
    className={`cursor-pointer border-2 p-1 hover:bg-slate-100 disabled:cursor-default disabled:bg-white ${className && className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
)
