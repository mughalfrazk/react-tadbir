import EventIcon from '@mui/icons-material/Event'
import { format } from 'date-fns'
import { FC, useState } from 'react'
import { BsTextParagraph } from 'react-icons/bs'
import { TbAlertSquareRounded, TbAlertSquareRoundedOff } from 'react-icons/tb'

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
import { TaskWithAssigneesModel } from '@/lib/models/task.model'

import TaskModalContent from './TaskModalContent'

export type TaskCardProps = {
  task: TaskWithAssigneesModel
  columnId?: string
}

const TaskCard: FC<TaskCardProps> = ({ task, columnId }) => {
  const barIconsStyles = { marginLeft: '0.25rem', marginRight: '0.25rem' }

  const [showTaskDetail, setShowTaskDetail] = useState<TaskWithAssigneesModel | null>(null)
  const handleClose = () => setShowTaskDetail(null)

  return (
    <>
      <Modal open={Boolean(showTaskDetail)} onClose={handleClose} width={540}>
        <TaskModalContent task={task} columnId={columnId} handleClose={handleClose} />
      </Modal>
      <Card sx={{ width: 300 }}>
        <ActionArea
          onClick={() => {
            console.log(task.id)
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
                {task.priority ? (
                  <TbAlertSquareRounded size={22} style={{ ...barIconsStyles }} />
                ) : (
                  <TbAlertSquareRoundedOff size={22} style={{ ...barIconsStyles }} />
                )}
                {task.description && <BsTextParagraph size={22} style={{ ...barIconsStyles }} />}
              </Stack>
              <AvatarGroup spacing="small" max={3}>
                {task?.task_assignee?.map((a, idx) => (
                  <Avatar
                    key={idx}
                    alt={a.profile.name}
                    src={a.profile?.photo_url ?? ''}
                    tooltip={a.profile.name}
                    sx={{ width: 30, height: 30 }}
                  />
                ))}
              </AvatarGroup>
            </Stack>
            <Typography mt={1}>{task.title}</Typography>
            <Stack direction="row" flexWrap="wrap" mt={1}>
              {/* {task?.tags &&
              task.tags.map((tag, idx) => (
                <Chip
                  key={idx}
                  label={tag.name}
                  sx={{ backgroundColor: tag.color, marginBottom: '0.5rem', marginRight: '0.5rem' }}
                />
              ))} */}
            </Stack>
            {task.end_date && (
              <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1} mt={1}>
                <EventIcon sx={{ fontSize: 20 }} />
                <Stack direction="row" flexWrap="wrap" alignItems="center">
                  {task.start_date && (
                    <Typography fontSize={14}>{format(task.start_date, 'dd-MM-yyyy')}</Typography>
                  )}
                  &nbsp;-&nbsp;
                  {task.end_date && (
                    <Typography fontSize={14}>{format(task.end_date, 'dd-MM-yyyy')}</Typography>
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
