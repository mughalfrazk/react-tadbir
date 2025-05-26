import { Close } from '@mui/icons-material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useState } from 'react'

import { TaskWithAssigneesModel } from '@/lib/models/task.model'

import AssigneeSection from './AssigneeSection'
import { Button, Chip, Stack, TextField, Typography } from '../../../mui'

const TaskModalContent = ({
  task,
  handleClose
}: {
  task: TaskWithAssigneesModel
  handleClose: () => void
}) => {
  const [desciption, setDescrption] = useState<string>(task?.description ?? '')
  return (
    <Stack px={2} pt={1} pb={4}>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" sx={{ pl: 1 }}>
          {task.title}
        </Typography>
        <Button isIconOnly size="small" onClick={handleClose}>
          <Close />
        </Button>
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
      <AssigneeSection assignees={task.task_assignees} taskId={task.id} />
    </Stack>
  )
}

export default TaskModalContent
