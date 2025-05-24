import EventIcon from '@mui/icons-material/Event'
import { format } from 'date-fns'
import { FC } from 'react'
import { BsTextParagraph } from 'react-icons/bs'
import { TbAlertSquareRounded, TbAlertSquareRoundedOff } from 'react-icons/tb'

import { TaskModel } from '@/lib/models/task.model'

import { ActionArea, AvatarGroup, Card, Content, Stack, Typography } from '../mui'

export type TaskCardProps = {
  task: TaskModel
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const barIconsStyles = { marginLeft: '0.25rem', marginRight: '0.25rem' }

  return (
    <Card sx={{ width: 300 }}>
      <ActionArea>
        <Content>
          <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center">
            <Stack direction="row" flexWrap="wrap">
              {task.priority ? (
                <TbAlertSquareRounded size={22} style={{ ...barIconsStyles }} />
              ) : (
                <TbAlertSquareRoundedOff size={22} style={{ ...barIconsStyles }} />
              )}
              {task.description && <BsTextParagraph size={22} style={{ ...barIconsStyles }} />}
            </Stack>
            <AvatarGroup spacing="small">
              {/* {task?.assingee &&
                task?.assingee?.map((a, idx) => (
                  <Avatar
                    key={idx}
                    alt={a.name}
                    src={a.image}
                    tooltip={a.name}
                    sx={{ width: 30, height: 30 }}
                  />
                ))} */}
            </AvatarGroup>
          </Stack>
          <Typography>{task.title}</Typography>
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
  )
}

export default TaskCard
