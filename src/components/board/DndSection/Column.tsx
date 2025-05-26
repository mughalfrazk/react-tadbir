import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Dispatch, SetStateAction } from 'react'
import { TbPlaylistX } from 'react-icons/tb'

import { Box, Paper, Stack, Typography } from '@/components/mui'
import { TaskWithAssigneesListModel } from '@/lib/models/task.model'

import AddTaskForm from './AddTaskForm'
import SortableItem from './SortableItem'

const Column = ({
  id,
  tasks,
  addTaskForm,
  setAddTaskForm
}: {
  id: string
  tasks: TaskWithAssigneesListModel
  addTaskForm: string
  setAddTaskForm: Dispatch<SetStateAction<string>>
}) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <Box ref={setNodeRef} className="rounded overflow-y-auto p-3" height="100%">
      {addTaskForm === id && <AddTaskForm columnId={id} setAddTaskForm={setAddTaskForm} />}
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.length ? (
          tasks.map((task) => <SortableItem key={task.id} id={String(task.id)} task={task} />)
        ) : (
          <Stack sx={{ height: '100%' }} justifyContent="center">
            <Paper
              sx={(theme) => ({
                backgroundColor: theme.palette.grey[800],
                opacity: 0.3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              })}
            >
              <Stack textAlign="center" alignItems="center">
                <TbPlaylistX size={40} />
                <Typography variant="subtitle2">Drag n Drop tasks</Typography>
              </Stack>
            </Paper>
          </Stack>
        )}
      </SortableContext>
    </Box>
  )
}

export default Column
