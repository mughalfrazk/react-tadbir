import Box from '@mui/material/Box'
import { DataGridProps, GridColDef, DataGrid as MuiDataGrid } from '@mui/x-data-grid'

const dummyRows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
]

const dummyColumns: GridColDef<(typeof dummyRows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (_, row) => `${row.firstName || ''} ${row.lastName || ''}`
  }
]

const DataGrid = <T extends object>({
  rows = dummyRows as T[],
  columns = dummyColumns,
  height = 400,
  disableRowSelectionOnClick = true,
  ...otherProps
}: {
  height?: string | number
} & DataGridProps) => (
  <Box sx={{ height, width: '100%' }}>
    <MuiDataGrid
      rows={rows}
      columns={columns}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      {...otherProps}
      sx={{ ...otherProps.sx, p: 0 }}
    />
  </Box>
)

export default DataGrid
