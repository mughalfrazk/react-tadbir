import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded'
import { Autocomplete, useTheme } from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router'

import { Button, List, ListItem, Stack, TextField, Typography } from '@/components/mui'
import CircularProgress from '@/components/mui/CircularProgress'
import {
  useCreateProjectContributorMutation,
  useDeleteProjectUserMutation,
  useGetProjectUsersListQuery
} from '@/lib/queries/project_user.query'
import { useSearchUserMutation } from '@/lib/queries/user.query'

import RoleSelectMenu from './RoleSelectMenu'

const ContributorsModal = () => {
  const theme = useTheme()
  const { project_id } = useParams()
  const { data: projectUsersList, isLoading } = useGetProjectUsersListQuery(project_id as string)

  const [optionsList, setOptionsList] = useState<{ id: string; label: string; name: string }[]>([])
  const [deletingContributingId, setDeletingContributingId] = useState<string>('')
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')

  const { mutate: searchUserMutation } = useSearchUserMutation({
    onSuccess: (result) => {
      setShowOptions(true)
      setOptionsList(result?.map((u) => ({ id: u.id, label: u.email, name: u.name })))
    }
  })

  const { mutate: createContributorMutation } = useCreateProjectContributorMutation({
    project_id: project_id as string,
    onSuccess: () => {
      setInputValue('')
    }
  })

  const { mutate: deleteContributorMutation } = useDeleteProjectUserMutation({
    project_id: project_id as string,
    onSuccess: () => {
      setInputValue('')
      setDeletingContributingId('')
    }
  })

  const userSearchHandler = () => {
    if (!inputValue) return

    searchUserMutation({
      text: inputValue,
      existingContributorIds: projectUsersList?.map((i) => i.profiles.id) ?? []
    })
  }

  return (
    <List sx={{ px: 2 }}>
      <ListItem sx={{ p: 0, mb: 2 }}>
        <Stack flexDirection="row" alignItems="center" width="100%" gap={1} mt={1}>
          <Autocomplete
            fullWidth
            open={showOptions}
            options={optionsList}
            onClose={() => setShowOptions(false)}
            clearOnBlur={false}
            inputValue={inputValue}
            onInputChange={(_, value) => setInputValue(value)}
            onChange={(_, value) => {
              if (!value) return
              createContributorMutation({
                project_id: project_id as string,
                user_id: value?.id
              })
            }}
            renderInput={(params) => (
              <TextField {...params} label="Search users..." sx={{ mt: 0 }} />
            )}
            renderOption={(props, option) => (
              <li
                {...props}
                key={option.id}
                className={`cursor-pointer hover:bg-[${theme.palette.action.hover}]`}
              >
                <Stack
                  px={2}
                  py={1}
                  sx={(theme) => ({
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  })}
                >
                  <Typography variant="h5">{option.name}</Typography>
                  <Typography variant="subtitle1">{option.label}</Typography>
                </Stack>
              </li>
            )}
          />
          <Button isIconOnly onClick={userSearchHandler}>
            <PersonSearchRoundedIcon />
          </Button>
        </Stack>
      </ListItem>
      {isLoading ? (
        <Stack flexDirection="row" justifyContent="center" py={4}>
          <CircularProgress />
        </Stack>
      ) : (
        projectUsersList?.map((item, idx) => (
          <ListItem
            key={item.id}
            sx={{
              pr: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: idx === 0 ? 0 : 1,
              borderColor: 'divider'
            }}
          >
            <Stack gap={0.5}>
              <Typography variant="h4">{item.profiles.name}</Typography>
              <Typography>{item.profiles.email}</Typography>
            </Stack>
            <Stack flexDirection="row" alignItems="center">
              <RoleSelectMenu role={item.project_roles} />
              <Button
                isIconOnly
                onClick={() => {
                  setDeletingContributingId(item.profiles.id)
                  deleteContributorMutation({
                    project_id: project_id as string,
                    user_id: item.profiles.id
                  })
                }}
              >
                {deletingContributingId === item.profiles.id ? (
                  <CircularProgress size={22} />
                ) : (
                  <DeleteForeverRoundedIcon color="error" />
                )}
              </Button>
            </Stack>
          </ListItem>
        ))
      )}
    </List>
  )
}

export default ContributorsModal
