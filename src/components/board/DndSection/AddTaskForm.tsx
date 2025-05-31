import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import { Button, Card, TextField } from '@/components/mui'
import { useBoard } from '@/context/board-context'
import { CreateTaskPayloadModel, CreateTaskPayloadSchema } from '@/lib/models/task.model'
import { useCreateTaskMutation } from '@/lib/queries/task.query'

const AddTaskForm = ({
  columnId,
  setAddTaskForm
}: {
  columnId: string
  setAddTaskForm: Dispatch<SetStateAction<string>>
}) => {
  const { project_id } = useParams()
  const { updateTaskInColumn } = useBoard()

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateTaskPayloadModel>({
    resolver: zodResolver(CreateTaskPayloadSchema),
    mode: 'onTouched'
  })

  const { mutate, isPending } = useCreateTaskMutation({
    onSuccess: (newTask) => {
      reset()
      setValue('project_id', project_id as string)
      setValue('column_id', columnId as string)
      setAddTaskForm('')
      updateTaskInColumn(columnId, { ...newTask, task_assignee: [], task_tag: [] })
    }
  })

  return (
    <form onSubmit={handleSubmit((v) => mutate(v))}>
      <Card sx={{ mb: 2, p: 2, pt: 0, width: 300 }}>
        <TextField
          {...register('title')}
          multiline
          rows={2}
          placeholder="Task name..."
          fieldError={errors['title']}
        />
        <TextField {...register('project_id')} name="project_id" value={project_id} hidden />
        <TextField {...register('column_id')} name="column_id" value={columnId} hidden />
        <Button type="submit" variant="contained" loading={isPending} fullWidth sx={{ mt: 2 }}>
          Add Task
        </Button>
      </Card>
    </form>
  )
}

export default AddTaskForm
