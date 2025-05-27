import { Close } from '@mui/icons-material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useState } from 'react'

import { useBoard } from '@/context/board-context'
import { TaskWithAssigneesModel } from '@/lib/models/task.model'
import { useDeleteTaskMutation } from '@/lib/queries/task.query'

import AssigneeSection from './AssigneeSection'
import { Button, Chip, Stack, TextField, Typography } from '../../../mui'

const TaskModalContent = ({
  task,
  columnId,
  handleClose
}: {
  task: TaskWithAssigneesModel
  columnId?: string
  handleClose: () => void
}) => {
  const { deleteTask } = useBoard()
  const [desciption, setDescrption] = useState<string>(task?.description ?? '')

  const { mutate, isPending } = useDeleteTaskMutation({
    onSuccess: () => {
      if (!columnId) return

      deleteTask(columnId, task.id)
      handleClose()
    }
  })

  return (
    <Stack px={2} pt={1.5} pb={4}>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" sx={{ pl: 1 }}>
          {task.title}
        </Typography>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Button
            size="small"
            color="error"
            variant="outlined"
            loading={isPending}
            onClick={() => mutate({ task_id: task.id })}
            startIcon={<DeleteForeverIcon />}
          >
            Delete
          </Button>
          <Button isIconOnly size="small" onClick={handleClose}>
            <Close />
          </Button>
        </Stack>
      </Stack>
      <Stack flexDirection="row" alignItems="center" gap={2} mt={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Start Date"
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="End Date"
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Stack>
      <TextField
        label="Description"
        multiline
        rows={3}
        value={desciption}
        onChange={(e) => setDescrption(e.target.value)}
      />
      <Typography px={1} mt={2} mb={1}>
        Tags
      </Typography>
      <Stack flexDirection="row" alignItems="center" flexWrap="wrap" gap={1} px={1}>
        <Chip label={'Frontend'} sx={{ backgroundColor: 'red' }} />
        <Button isIconOnly size="small">
          <AddRoundedIcon />
        </Button>
      </Stack>
      <AssigneeSection assignees={task.task_assignee} taskId={task.id} columnId={columnId} />
    </Stack>
  )
}

export default TaskModalContent
