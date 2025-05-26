import { Close } from '@mui/icons-material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { Avatar, Box, Button, Menu, MenuItem, Stack, Typography } from '@/components/mui'
import CircularProgress from '@/components/mui/CircularProgress'
import { TaskAssigneeListModel } from '@/lib/models/task_assignee.model'
import { ProfileListModel } from '@/lib/models/user.model'
import { useGetProjectUsersListQuery } from '@/lib/queries/project_user.query'
import {
  useCreateTaskAssigneeMutation,
  useDeleteTaskAssignmentMutation
} from '@/lib/queries/task_assignee.query'

const AssigneeSection = ({
  assignees,
  taskId
}: {
  assignees: TaskAssigneeListModel
  taskId: string
}) => {
  const { project_id } = useParams()
  const { data: projectUsersList } = useGetProjectUsersListQuery(project_id as string)

  const [contributorsList, setContributorsList] = useState<ProfileListModel>([])
  const [showDeleteBtnId, setShowDeleteBtnId] = useState<number>()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { mutate: addAssigneeMutation, isPending: addAssigneeLoading } =
    useCreateTaskAssigneeMutation({
      onSuccess: () => {}
    })

  const { mutate: deleteAssigneeMutation, isPending: deleteAssigneeLoading } =
    useDeleteTaskAssignmentMutation({
      onSuccess: (result) => {
        console.log(result)
        // deleteAssigneeFromTask(result.user_id, result.task_id)
      }
    })

  const addAssignee = (userId: string) => {
    addAssigneeMutation({ task_id: taskId, user_id: userId })
    handleClose()
  }

  useEffect(() => {
    if (projectUsersList?.length) {
      const assignedIds = assignees.map((a) => a.profiles.id)
      setContributorsList(
        projectUsersList.filter((c) => !assignedIds.includes(c.profiles.id)).map((c) => c.profiles)
      )
    }
  }, [projectUsersList, assignees])

  useEffect(() => {
    console.log('contributorsList: ', contributorsList)
  }, [contributorsList])

  return (
    <Stack mt={2} px={1}>
      <Stack flexDirection="row" alignItems="center" mb={1} gap={1}>
        <Typography>Assignees</Typography>
      </Stack>
      <Stack flexDirection="row" alignItems="center" flexWrap="wrap" gap={1} px={1}>
        {assignees?.map((a, idx) => (
          <Box key={idx} position="relative">
            <Avatar
              alt={a.profiles.name}
              src={a.profiles?.photo_url ?? ''}
              tooltip={a.profiles.name}
              sx={{ width: 35, height: 35, opacity: showDeleteBtnId === a.id ? '0.2' : '1' }}
            />
            <div
              className="absolute top-0 cursor-pointer"
              onMouseEnter={() => setShowDeleteBtnId(a.id)}
              onMouseLeave={() => setShowDeleteBtnId(undefined)}
            >
              {deleteAssigneeLoading ? (
                <CircularProgress size={30} />
              ) : (
                <Button
                  isIconOnly
                  size="small"
                  onClick={() =>
                    deleteAssigneeMutation({ task_id: taskId, user_id: a.profiles.id })
                  }
                >
                  <Close sx={{ visibility: showDeleteBtnId === a.id ? 'visible' : 'hidden' }} />
                </Button>
              )}
            </div>
          </Box>
        ))}
        {addAssigneeLoading && <CircularProgress size={30} />}
        <Button
          isIconOnly
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <AddRoundedIcon />
        </Button>
        <Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            {!contributorsList.length ? (
              <MenuItem>No Contributors to Add</MenuItem>
            ) : (
              contributorsList?.map((a, idx) => (
                <MenuItem
                  key={idx}
                  sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
                  onClick={() => addAssignee(a.id)}
                >
                  <Avatar
                    alt={a.name}
                    src={a?.photo_url ?? ''}
                    tooltip={a.name}
                    sx={{ width: 25, height: 25 }}
                  />
                  <Typography>{a.name}</Typography>
                </MenuItem>
              ))
            )}
          </Menu>
        </Box>
      </Stack>
    </Stack>
  )
}

export default AssigneeSection
