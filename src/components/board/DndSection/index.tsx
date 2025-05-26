import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { Box, Button, Card, Stack, Typography } from '@/components/mui'
import { useBoard } from '@/context/board-context'
import { useGetProjectDetailQuery } from '@/lib/queries/project.query'

import AddColumnForm from './AddColumnForm'
import Column from './Column'
import DndContextWrapper from './DndContextWrapper'

const ProjectBoard = () => {
  const theme = useTheme()
  const { project_id } = useParams()
  const { columns, setColumns, activeColumn } = useBoard()
  const { projectDetail } = useGetProjectDetailQuery(project_id as string)

  const [addTaskForm, setAddTaskForm] = useState<string>('')

  useEffect(() => {
    if (projectDetail) {
      setColumns(projectDetail.projects.columns)
    }
  }, [projectDetail])

  return (
    <DndContextWrapper>
      <Stack direction="row" gap={2} px={3} pb={2} sx={{ overflowX: 'auto' }}>
        {columns.map((column) => (
          <Card
            key={column.id}
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
            <Column
              key={column.id}
              id={column.id}
              tasks={column.tasks}
              addTaskForm={addTaskForm}
              setAddTaskForm={setAddTaskForm}
            />
          </Card>
        ))}
        <AddColumnForm columnsLength={columns.length} />
      </Stack>
    </DndContextWrapper>
  )
}

export default ProjectBoard
