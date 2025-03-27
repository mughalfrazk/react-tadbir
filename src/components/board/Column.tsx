import { FC } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { useTheme } from '@mui/material'

import { TaskType } from '../../pages/board/project'
import { lightDark } from '../../utils/functions'
import Typography from '../mui/Typography'
import SortableItem from './SortableItem'
import Card from '../mui/Card'
import Box from '../mui/Box'

export type ColumnProps = {
  id: string
  title: string
  tasks: TaskType[]
  activeTask: TaskType | null
  activeColumn: string | null
}

const Column: FC<ColumnProps> = ({ id, title, tasks, activeColumn, activeTask }) => {
  const theme = useTheme()
  const { setNodeRef } = useDroppable({ id: id })

  return (
    <Box ref={setNodeRef}>
      <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}>
        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>{title}</Typography>
        <Card
          sx={lightDark(
            {
              width: 300,
              minWidth: 300,
              overflowY: 'auto',
              overflowX: 'hidden',
              height: 'calc(100vh - 220px)',
              backgroundColor: theme.palette.grey[50]
            },
            {
              backgroundColor: theme.palette.grey[900],
              border: activeColumn === id ? 1 : 0,
              borderColor: theme.palette.primary.main
            }
          )}
        >
          {tasks.map((task) => (
            <SortableItem key={task.id} id={task.id} task={task} activeTask={activeTask} />
          ))}
        </Card>
      </SortableContext>
    </Box>
  )
}

export default Column
