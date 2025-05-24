import { zodResolver } from '@hookform/resolvers/zod'
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import BreadCrumbBackground from '@/components/common/BreadCrumbBackground'
import { Box, Button, Stack, TextField, Typography } from '@/components/mui'
import { useAuth } from '@/context/auth-context'
import { CreateProjectPayloadModel, CreateProjectPayloadSchema } from '@/lib/models/project.model'
import { useCreateProjectMutate } from '@/lib/queries/project.query'

const CreateProjectPage = () => {
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateProjectPayloadModel>({
    resolver: zodResolver(CreateProjectPayloadSchema),
    mode: 'onTouched'
  })
  const navigate = useNavigate()
  const { session } = useAuth()

  const { mutate, isPending } = useCreateProjectMutate({
    onSuccess: () => {
      reset()
      setValue('user_id', session?.uid as string)
      navigate('/dashboard')
    }
  })

  const links = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <HomeRoundedIcon sx={{ fontSize: 20 }} />
    },
    {
      title: 'Create project',
      icon: <CreateNewFolderRoundedIcon sx={{ fontSize: 20 }} />
    }
  ]

  return (
    <BreadCrumbBackground links={links}>
      <Stack display="row" justifyContent="center" alignItems="center" height="80%">
        <Box>
          <form onSubmit={handleSubmit((v) => mutate(v))}>
            <Typography variant="h5" textAlign="center" mb={2}>
              Create new project
            </Typography>
            <TextField
              {...register('name')}
              type="text"
              name="name"
              label="Name"
              sx={{ mt: 0 }}
              fieldError={errors['name']}
            />
            <TextField
              {...register('description')}
              type="text"
              name="description"
              label="Description"
              multiline
              rows={3}
              fieldError={errors['description']}
            />
            <TextField {...register('user_id')} name="user_id" value={session?.uid} hidden />
            <Button type="submit" variant="contained" fullWidth loading={isPending} sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Stack>
    </BreadCrumbBackground>
  )
}

export default CreateProjectPage
