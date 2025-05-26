import ViewKanbanRoundedIcon from '@mui/icons-material/ViewKanbanRounded'
import { GridColDef } from '@mui/x-data-grid'

import BreadCrumbBackground from '@/components/common/BreadCrumbBackground'
import { Button, DataGrid, Stack, Typography } from '@/components/mui'
import { ProjectTableListModel } from '@/lib/models/project.model'
import { useGetProjectListQuery } from '@/lib/queries/project.query'

const dummyColumns: GridColDef<ProjectTableListModel[number]>[] = [
  {
    field: 'id',
    headerName: '#',
    renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1
  },
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 200,
    valueGetter: (_, row) => `${row.projects.name}`
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    valueGetter: (_, row) => `${row.projects.description}`
  },
  {
    field: 'role',
    headerName: 'Role',
    headerAlign: 'right',
    align: 'right',
    width: 150,
    valueGetter: (_, row) => `${row.project_roles.name}`
  },
  {
    field: 'action',
    headerName: 'Action',
    headerAlign: 'right',
    align: 'right',
    width: 100,
    renderCell: ({ row }) => (
      <Stack height="100%" flexDirection="row" justifyContent="flex-end" alignItems="center">
        <Button component="a" href={`/dashboard/project/${row.projects.id}`} isIconOnly>
          <ViewKanbanRoundedIcon />
        </Button>
      </Stack>
    )
  }
]

const DashboardPage = () => {
  const { projectList, isLoading } = useGetProjectListQuery()

  return (
    <BreadCrumbBackground>
      <DataGrid
        columns={dummyColumns}
        loading={isLoading}
        rows={projectList}
        height="100%"
        checkboxSelection
        disableRowSelectionOnClick
        sx={{ border: 1, borderColor: 'divider' }}
        slots={{
          toolbar: () => (
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              px={2}
              py={1}
            >
              <Typography variant="h4">Project List</Typography>
              <Stack flexDirection="row" alignItems="center" gap={1} py={0.5}>
                <Button
                  component="a"
                  href="/dashboard/project/create"
                  size="small"
                  variant="contained"
                  sx={{ px: 1 }}
                >
                  Create new project
                </Button>
              </Stack>
            </Stack>
          )
        }}
      />
    </BreadCrumbBackground>
  )
}

export default DashboardPage
