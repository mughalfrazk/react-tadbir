import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { Box, Button, Card, Skeleton, Stack, Typography } from '@/components/mui'
import { useBoard } from '@/context/board-context'
import { ColumnModel } from '@/lib/models/column.model'
import { useDeleteColumnMutation } from '@/lib/queries/column.query'
import { useGetProjectDetailQuery } from '@/lib/queries/project.query'

import AddColumn from './AddColumn'
import Column from './Column'
import DndContextWrapper from './DndContextWrapper'

const BoardColumn = ({ column }: { column: ColumnModel }) => {
  const theme = useTheme()
  const { activeColumn, deleteColumn } = useBoard()

  const [addTaskForm, setAddTaskForm] = useState<string>('')

  const { mutate, isPending } = useDeleteColumnMutation({
    onSuccess: () => {
      deleteColumn(column.id)
    }
  })

  const handleDeleteColumn = () => {
    if (column.task.length) {
      console.log('Clear the tasks from the column to delete it.')
      return
    }

    mutate({ column_id: column.id })
  }

  return (
    <Card
      className="transition duration-700 ease-in-out"
      sx={{
        position: 'relative',
        paddingLeft: 5,
        minWidth: 365,
        overflowX: 'hidden',
        height: 'calc(100vh - 17.5rem)',
        backgroundColor: theme.palette.grey[900],
        border: activeColumn === column.id ? 1 : 1,
        borderColor:
          activeColumn === column.id ? theme.palette.primary.main : theme.palette.grey[900]
      }}
    >
      <Stack
        className="absolute top-2 left-[6px]"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <Box>
          <Button
            isIconOnly
            sx={{ opacity: 0.4 }}
            onClick={() => {
              if (addTaskForm === column.id) setAddTaskForm('')
              else setAddTaskForm(column.id)
            }}
          >
            {addTaskForm === column.id ? <CloseRoundedIcon /> : <AddRoundedIcon />}
          </Button>
        </Box>
        <Typography
          variant="h5"
          sx={{ width: '100%', opacity: 0.4, marginLeft: 2.5 }}
          letterSpacing={0.8}
          className="origin-left uppercase rotate-90"
        >
          {column.name}
        </Typography>
      </Stack>
      <div className="absolute bottom-2 left-1">
        <Button isIconOnly color="error" loading={isPending} onClick={handleDeleteColumn}>
          <DeleteForeverIcon />
        </Button>
      </div>
      <Column
        id={column.id}
        tasks={column.task}
        addTaskForm={addTaskForm}
        setAddTaskForm={setAddTaskForm}
      />
    </Card>
  )
}

const ProjectBoard = () => {
  const { project_id } = useParams()
  const { columns, setColumns } = useBoard()
  const { projectDetail, isLoading } = useGetProjectDetailQuery(project_id as string)

  useEffect(() => {
    if (projectDetail) {
      setColumns(projectDetail.project.column)
    }
  }, [projectDetail])

  return (
    <DndContextWrapper>
      <Stack direction="row" gap={2} px={3} pb={2} sx={{ overflowX: 'auto' }}>
        {isLoading ? (
          <Stack flexDirection="row" gap={2}>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={365}
              height="calc(100vh - 17.5rem)"
            />
            <Skeleton variant="rounded" width={365} height="calc(100vh - 17.5rem)" />
            <Skeleton variant="rounded" width={365} height="calc(100vh - 17.5rem)" />
          </Stack>
        ) : (
          columns.map((col) => <BoardColumn key={col.id} column={col} />)
        )}
        <AddColumn columnsLength={columns.length} />
      </Stack>
    </DndContextWrapper>
  )
}

export default ProjectBoard
