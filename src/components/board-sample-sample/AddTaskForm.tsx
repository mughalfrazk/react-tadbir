import { Button, Card, TextField } from '@/components/mui'

const AddTaskForm = () => {
  // const { mutate, isPending } = useCreateColumnMutate({
  //   onSuccess: () => {
  //     reset()
  //     setValue('project_id', params.id as string)
  //     setAddColumnForm(false)
  //   }
  // })

  return (
    <Card sx={{ mb: 2, p: 2, pt: 0, width: 300 }}>
      <TextField multiline rows={2} placeholder="Task name..." />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Add Task
      </Button>
    </Card>
  )
}

export default AddTaskForm
