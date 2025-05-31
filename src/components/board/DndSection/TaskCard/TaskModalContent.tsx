import { Close, Save } from '@mui/icons-material'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Input } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'

import Switch from '@/components/mui/Switch'
import { useBoard } from '@/context/board-context'
import { TaskTagModel } from '@/lib/models/tag.model'
import { TaskWithAssigneeAndTagModel, UpdateTaskPayloadModel } from '@/lib/models/task.model'
import { useDeleteTaskTagMutation } from '@/lib/queries/tag.query'
import { useDeleteTaskMutation, useUpdateTaskMutation } from '@/lib/queries/task.query'

import AddTagModal from './AddTagModal'
import AssigneeSection from './AssigneeSection'
import { Button, Checkbox, Stack, TextField, Typography } from '../../../mui'

type EditableTaskDetailModel = {
  title: string
  priority: boolean
  done: boolean
  description?: string | null | undefined
  start_date?: Dayjs | null
  end_date?: Dayjs | null
  parent_id?: string | null | undefined
}

const TaskModalContent = ({
  task,
  columnId,
  handleClose
}: {
  task: TaskWithAssigneeAndTagModel
  columnId?: string
  handleClose: () => void
}) => {
  const { updateDetailToTask, deleteTask, removeTagFromTask } = useBoard()
  const [deletetingTagId, setDeletingTagId] = useState<number>()

  const [editTitle, setEditTitle] = useState<boolean>(false)
  const [isDetailChanged, setIsDetailChanged] = useState<boolean>(false)
  const [updateTaskPayload, setUpdateTaskPayload] = useState<EditableTaskDetailModel>({
    title: '',
    description: '',
    priority: false,
    done: false,
    start_date: null,
    end_date: null
  })

  const { mutate, isPending } = useDeleteTaskMutation({
    onSuccess: () => {
      if (!columnId) return

      deleteTask(columnId, task.id)
      handleClose()
    }
  })

  const { mutate: updateTaskMutation, isPending: updateTaskLoading } = useUpdateTaskMutation({
    onSuccess: () => {
      if (!columnId) return
      const start_date = dayjs(updateTaskPayload.start_date).isValid()
        ? updateTaskPayload.start_date?.toISOString()
        : ''
      const end_date = dayjs(updateTaskPayload.end_date).isValid()
        ? updateTaskPayload.end_date?.toISOString()
        : ''
      const finalPayload: UpdateTaskPayloadModel = {
        ...updateTaskPayload,
        start_date,
        end_date
      }

      updateDetailToTask(columnId, task.id, finalPayload)
      handleClose()
    }
  })

  const { mutate: deleteTaskTagMutation, isPending: deleteTaskTagLoading } =
    useDeleteTaskTagMutation({
      onSuccess: (taskTag: TaskTagModel) => {
        removeTagFromTask(columnId as string, task.id, taskTag.tag_id)
        setDeletingTagId(undefined)
      }
    })

  const isDetailChangedHandler = () => {
    const start_date = dayjs(updateTaskPayload.start_date).isValid()
      ? updateTaskPayload.start_date?.toISOString()
      : ''
    const end_date = dayjs(updateTaskPayload.end_date).isValid()
      ? updateTaskPayload.end_date?.toISOString()
      : ''

    const originalDetail: UpdateTaskPayloadModel = {
      title: task.title ?? '',
      description: task.description ?? '',
      priority: task.priority,
      done: task.done,
      start_date: task.start_date ?? '',
      end_date: task.end_date ?? ''
    }

    const finalPayload: UpdateTaskPayloadModel = {
      ...updateTaskPayload,
      start_date,
      end_date
    }

    if (
      finalPayload.title === originalDetail.title &&
      finalPayload.description === originalDetail.description &&
      finalPayload.priority === originalDetail.priority &&
      finalPayload.done === originalDetail.done &&
      finalPayload.start_date === originalDetail.start_date &&
      finalPayload.end_date === originalDetail.end_date
    ) {
      setIsDetailChanged(false)
      return
    }

    setIsDetailChanged(true)
  }

  const saveAndCloseHandler = () => {
    if (!isDetailChanged) return

    const start_date = dayjs(updateTaskPayload.start_date).isValid()
      ? updateTaskPayload.start_date?.toISOString()
      : ''
    const end_date = dayjs(updateTaskPayload.end_date).isValid()
      ? updateTaskPayload.end_date?.toISOString()
      : ''
    const payload: UpdateTaskPayloadModel = {
      ...updateTaskPayload,
      start_date,
      end_date
    }

    updateTaskMutation({ taskId: task.id, payload })
  }

  const cancelChangesHandler = () => {
    setUpdateTaskPayload({
      title: task.title ?? '',
      description: task.description ?? '',
      priority: task?.priority ?? false,
      done: task?.done ?? false,
      start_date: dayjs(task.start_date),
      end_date: dayjs(task.end_date)
    })
  }

  useEffect(() => {
    cancelChangesHandler()
  }, [])

  useEffect(() => {
    isDetailChangedHandler()
  }, [updateTaskPayload])

  return (
    <Stack px={2} pt={1.5}>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Stack flexDirection="row" alignItems="center" gap={0} width="100%">
          <Checkbox
            color="secondary"
            icon={<CheckCircleOutlineRoundedIcon />}
            checkedIcon={<CheckCircleRoundedIcon />}
            onChange={(e) => {
              setUpdateTaskPayload((prev) => ({ ...prev, done: e.target.checked }))
            }}
          />
          {editTitle ? (
            <Input
              fullWidth
              placeholder="Title"
              value={updateTaskPayload.title}
              onChange={(e) => {
                setUpdateTaskPayload((prev) => {
                  return { ...prev, title: e.target.value }
                })
              }}
              onBlur={() => setEditTitle(false)}
            />
          ) : (
            <Typography variant="h4" sx={{ pl: 1 }} onClick={() => setEditTitle(true)}>
              {updateTaskPayload.title}
            </Typography>
          )}
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={0.5}>
          <Button
            isIconOnly
            size="small"
            color="error"
            variant="outlined"
            loading={isPending}
            onClick={() => mutate({ task_id: task.id })}
          >
            <DeleteForeverIcon />
          </Button>
          <Button isIconOnly size="small" onClick={handleClose}>
            <Close />
          </Button>
        </Stack>
      </Stack>
      <Stack flexDirection="row" alignItems="center" gap={2} mt={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Start Date"
              value={updateTaskPayload?.start_date ?? null}
              onChange={(newValue) => {
                setUpdateTaskPayload((prev) => {
                  if (dayjs(newValue).isAfter(updateTaskPayload.end_date)) {
                    console.log('Start date should be earlier than end date.')
                    return { ...prev }
                  }

                  return { ...prev, start_date: dayjs(newValue) }
                })
              }}
              slotProps={{ textField: { fullWidth: true, size: 'small', error: false } }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="End Date"
              value={updateTaskPayload?.end_date ?? null}
              onChange={(newValue) => {
                setUpdateTaskPayload((prev) => {
                  if (dayjs(newValue).isBefore(updateTaskPayload.start_date)) {
                    console.log('End date should be later than start date.')
                    return { ...prev }
                  }

                  return { ...prev, end_date: dayjs(newValue) }
                })
              }}
              slotProps={{ textField: { fullWidth: true, size: 'small', error: false } }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Stack>
      <TextField
        label="Description"
        multiline
        rows={3}
        value={updateTaskPayload.description}
        onChange={(e) => {
          setUpdateTaskPayload((prev) => ({ ...prev, description: e.target.value }))
        }}
      />
      <Stack flexDirection="row" alignItems="center" px={1} mt={2} gap={1}>
        <Typography mb={0.5}>Mark as priority</Typography>
        <Switch
          value={updateTaskPayload.priority}
          onChange={(e) => {
            setUpdateTaskPayload((prev) => ({ ...prev, priority: e.target.checked }))
          }}
        />
      </Stack>

      <Typography px={1} mb={1}>
        Tags
      </Typography>
      <Stack flexDirection="row" alignItems="center" flexWrap="wrap" gap={1} px={1}>
        {task.task_tag.map((item) => (
          <Stack
            key={item.id}
            flexDirection="row"
            alignItems="center"
            sx={{
              backgroundColor: item.tag.color,
              borderRadius: '0.2rem',
              cursor: 'pointer'
            }}
          >
            <Typography pl={1.5}>{item.tag.name}</Typography>
            <Button
              isIconOnly
              size="small"
              loading={item.id === deletetingTagId && deleteTaskTagLoading}
              onClick={() => {
                deleteTaskTagMutation({ task_tag_id: item.id })
                setDeletingTagId(item.id)
              }}
            >
              <Close />
            </Button>
          </Stack>
        ))}
        <AddTagModal columnId={columnId as string} taskId={task.id} taskTags={task.task_tag} />
      </Stack>
      <AssigneeSection assignees={task.task_assignee} taskId={task.id} columnId={columnId} />
      <Stack flexDirection="row" justifyContent="flex-end" pb={2} gap={1}>
        <Button
          color="primary"
          size="small"
          loading={updateTaskLoading}
          disabled={!isDetailChanged}
          startIcon={<Save sx={{ fontSize: 22 }} />}
          onClick={saveAndCloseHandler}
        >
          Save & Close
        </Button>
      </Stack>
    </Stack>
  )
}

export default TaskModalContent
