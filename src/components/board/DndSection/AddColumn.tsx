import { zodResolver } from '@hookform/resolvers/zod'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { ClickAwayListener } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import { Box, Button, Card, Stack, TextField, Typography } from '@/components/mui'
import { CreateColumnPayloadModel, CreateColumnPayloadSchema } from '@/lib/models/column.model'
import { useCreateColumnMutate } from '@/lib/queries/column.query'

const AddColumnForm = ({
  columnsLength,
  setAddColumnForm
}: {
  columnsLength: number
  setAddColumnForm: Dispatch<SetStateAction<boolean>>
}) => {
  const { project_id } = useParams()
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateColumnPayloadModel>({
    resolver: zodResolver(CreateColumnPayloadSchema),
    mode: 'onTouched'
  })

  const { mutate, isPending } = useCreateColumnMutate({
    project_id: project_id as string,
    onSuccess: () => {
      reset()
      setValue('project_id', project_id as string)
      setAddColumnForm(false)
    }
  })
  return (
    <ClickAwayListener onClickAway={() => setAddColumnForm(false)}>
      <form onSubmit={handleSubmit((v) => mutate(v))}>
        <Stack sx={{ p: 2, pt: 1, width: 300 }}>
          <Stack flexDirection="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h5">Add Column</Typography>
            <Button isIconOnly size="small" onClick={() => setAddColumnForm(false)}>
              <CloseRoundedIcon />
            </Button>
          </Stack>
          <TextField
            {...register('name')}
            type="text"
            name="name"
            label="Name"
            sx={{ mt: 0 }}
            fieldError={errors['name']}
          />
          <TextField {...register('sort')} name="sort" value={columnsLength} hidden />
          <TextField {...register('project_id')} name="project_id" value={project_id} hidden />
          <Button type="submit" variant="contained" fullWidth loading={isPending} sx={{ mt: 2 }}>
            Submit
          </Button>
        </Stack>
      </form>
    </ClickAwayListener>
  )
}

const AddColumn = ({ columnsLength }: { columnsLength: number }) => {
  const [addColumnForm, setAddColumnForm] = useState<boolean>(false)

  return (
    <Box>
      {addColumnForm ? (
        <Card sx={(theme) => ({ backgroundColor: theme.palette.grey[900] })}>
          <AddColumnForm columnsLength={columnsLength} setAddColumnForm={setAddColumnForm} />
        </Card>
      ) : (
        <Card sx={(theme) => ({ backgroundColor: theme.palette.grey[900] })}>
          <Button
            color="primary"
            sx={{
              width: '36px',
              px: '0px !important',
              minWidth: '30px !important'
            }}
            onClick={() => setAddColumnForm(true)}
          >
            <AddRoundedIcon />
          </Button>
        </Card>
      )}
    </Box>
  )
}

export default AddColumn
