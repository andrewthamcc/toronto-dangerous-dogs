import { createColumnHelper } from '@tanstack/react-table'
import { Dog } from '~/types'
import {
  Location,
  Severity,
  formatIncidentLocation,
  getSeverity,
} from '~/utils/tableHelpers'

const columnHelper = createColumnHelper<Dog>()
export const columns = [
  columnHelper.accessor('Name_of_Dog', {
    header: () => <p className="text-left">Name</p>,
    cell: (info) => (
      <span className="capitalize">{info.getValue()?.toLowerCase()}</span>
    ),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('Breed', {
    header: () => <p className="text-left">Breed</p>,
    cell: (info) => (
      <span className="capitalize">{info.getValue()?.toLowerCase()}</span>
    ),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('Color', {
    header: () => <p className="text-left">Colour</p>,
    cell: (info) => (
      <span className="capitalize">{info.getValue()?.toLowerCase()}</span>
    ),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('Bite_Circumstance', {
    header: 'Bite',
    cell: (info) => (
      <p className="text-center">{getSeverity(info.getValue() as Severity)}</p>
    ),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => `${row.Ward_Number} - ${row.Ward_Name}`, {
    id: 'ward',
    header: () => <p className="text-left">Ward</p>,
  }),
  columnHelper.accessor('Forward_Sortation_Area', {
    header: 'Area',
    cell: (info) => <p className="text-center">{info.getValue()}</p>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('Location_of_Incident', {
    header: () => <p className="text-left">Location</p>,
    cell: (info) => formatIncidentLocation(info.getValue() as Location),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('Date_of_Dangerous_Act', {
    header: () => <p className="text-left">Date</p>,
    cell: (info) => <p>{new Date(info.getValue()).toLocaleDateString()}</p>,
    footer: (info) => info.column.id,
  }),
]
