import { Close } from '@mui/icons-material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { Avatar, Box, Button, Menu, MenuItem, Stack, Typography } from '@/components/mui'
import CircularProgress from '@/components/mui/CircularProgress'
import { useBoard } from '@/context/board-context'
import { TaskAssigneeListModel } from '@/lib/models/task_assignee.model'
import { ProfileListModel } from '@/lib/models/user.model'
import { useGetProjectUsersListQuery } from '@/lib/queries/contributor.query'
import {
  useCreateTaskAssigneeMutation,
  useDeleteTaskAssignmentMutation
} from '@/lib/queries/task_assignee.query'

const AssigneeSection = ({
  assignees,
  taskId,
  columnId
}: {
  assignees: TaskAssigneeListModel
  taskId: string
  columnId?: string
}) => {
  const { project_id } = useParams()
  const { addAsigneeToTask, removeAsigneeFromTask } = useBoard()
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
      onSuccess: (result) => {
        if (!columnId) return

        addAsigneeToTask(columnId, taskId, result)
      }
    })

  const { mutate: deleteAssigneeMutation, isPending: deleteAssigneeLoading } =
    useDeleteTaskAssignmentMutation({
      onSuccess: (result) => {
        if (!columnId) return

        removeAsigneeFromTask(result.profile_id, columnId, result.task_id)
      }
    })

  const addAssignee = (userId: string) => {
    addAssigneeMutation({ task_id: taskId, profile_id: userId })
    handleClose()
  }

  useEffect(() => {
    if (projectUsersList?.length) {
      const assignedIds = assignees.map((a) => a.profile.id)
      setContributorsList(
        projectUsersList.filter((c) => !assignedIds.includes(c.profile.id)).map((c) => c.profile)
      )
    }
  }, [projectUsersList, assignees])

  return (
    <Stack mt={2} px={1}>
      <Stack flexDirection="row" alignItems="center" mb={1} gap={1}>
        <Typography>Assignees</Typography>
      </Stack>
      <Stack flexDirection="row" alignItems="center" flexWrap="wrap" gap={1} px={1}>
        {assignees?.map((a, idx) => (
          <Box key={idx} position="relative">
            <Avatar
              alt={a.profile.name}
              src={a.profile?.photo_url ?? ''}
              tooltip={a.profile.name}
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
                    deleteAssigneeMutation({ task_id: taskId, profile_id: a.profile.id })
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
          id="assignee-button"
          aria-controls={open ? 'assignee-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <AddRoundedIcon />
        </Button>
        <Box>
          <Menu
            id="assignee-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            closeAfterTransition={false}
            MenuListProps={{
              'aria-labelledby': 'assignee-button'
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
