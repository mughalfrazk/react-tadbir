import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded'
import EventIcon from '@mui/icons-material/Event'
import ReportOffRoundedIcon from '@mui/icons-material/ReportOffRounded'
import ReportRoundedIcon from '@mui/icons-material/ReportRounded'
import dayjs from 'dayjs'
import { FC, useState } from 'react'
import { BsTextParagraph } from 'react-icons/bs'

import {
  ActionArea,
  Avatar,
  AvatarGroup,
  Card,
  Content,
  Modal,
  Stack,
  Typography
} from '@/components/mui'
import { TaskWithAssigneeAndTagModel, TaskWithAssigneesModel } from '@/lib/models/task.model'

import TaskModalContent from './TaskModalContent'

export type TaskCardProps = {
  task: TaskWithAssigneeAndTagModel
  columnId?: string
}

const TaskCard: FC<TaskCardProps> = ({ task, columnId }) => {
  const barIconsStyles = { marginLeft: '0.25rem', marginRight: '0.25rem' }

  const [showTaskDetail, setShowTaskDetail] = useState<TaskWithAssigneesModel | null>(null)
  const handleClose = () => setShowTaskDetail(null)

  return (
    <>
      <Modal
        open={Boolean(showTaskDetail)}
        onClose={handleClose}
        width={540}
        // important for preventing the task in background to drag while modal is open.
        onPointerDown={(e) => e.stopPropagation()}
        onDragStart={(e) => e.stopPropagation()}
      >
        <TaskModalContent task={task} columnId={columnId} handleClose={handleClose} />
      </Modal>
      <Card sx={{ width: 300 }}>
        <ActionArea
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setShowTaskDetail(task)
          }}
        >
          <Content>
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" flexWrap="wrap">
                {task.done && (
                  <DoneAllRoundedIcon
                    color="success"
                    sx={{ fontSize: 24 }}
                    style={{ ...barIconsStyles }}
                  />
                )}
                {task.priority ? (
                  <ReportRoundedIcon
                    color="primary"
                    sx={{ fontSize: 24 }}
                    style={{ ...barIconsStyles }}
                  />
                ) : (
                  <ReportOffRoundedIcon sx={{ fontSize: 24 }} style={{ ...barIconsStyles }} />
                )}
                {task.description && <BsTextParagraph size={22} style={{ ...barIconsStyles }} />}
              </Stack>
              <AvatarGroup spacing="small" max={3}>
                {task?.task_assignee?.map((a, idx) =>
                  a.profile?.photo_url ? (
                    <Avatar
                      key={idx}
                      alt={a.profile.name}
                      src={a.profile.photo_url}
                      tooltip={a.profile.name}
                      sx={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <Avatar
                      key={idx}
                      alt={a.profile.name}
                      src={''}
                      tooltip={a.profile.name}
                      sx={{ width: 30, height: 30 }}
                    />
                  )
                )}
              </AvatarGroup>
            </Stack>
            <Typography mt={1}>{task.title}</Typography>
            <Stack direction="row" flexWrap="wrap" mt={2} gap={1}>
              {task?.task_tag?.map((item) => (
                <Stack
                  key={item.id}
                  sx={{
                    backgroundColor: item.tag.color,
                    borderRadius: '0.3rem',
                    cursor: 'pointer',
                    px: 1.2,
                    py: 0.2
                  }}
                >
                  <Typography>{item.tag.name}</Typography>
                </Stack>
              ))}
            </Stack>
            {task.end_date && (
              <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1} mt={1}>
                <EventIcon sx={{ fontSize: 20 }} />
                <Stack direction="row" flexWrap="wrap" alignItems="center">
                  {task.start_date && (
                    <Typography fontSize={14}>
                      {dayjs(task.start_date).format('DD/MM/YYYY')}
                    </Typography>
                  )}
                  &nbsp;-&nbsp;
                  {task.end_date && (
                    <Typography fontSize={14}>
                      {dayjs(task.end_date).format('DD/MM/YYYY')}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            )}
          </Content>
        </ActionArea>
      </Card>
    </>
  )
}

export default TaskCard
