import { BsTextParagraph } from 'react-icons/bs'
import { TbAlertSquareRounded, TbAlertSquareRoundedOff } from 'react-icons/tb'

import Chip from '../mui/Chip'
import Stack from '../mui/Stack'
import Typography from '../mui/Typography'
import Avatar, { AvatarGroup } from '../mui/Avatar'
import { TaskType } from '../../pages/board/project'
import Card, { ActionArea, Content } from '../mui/Card'

const TaskCard = ({ task }: { task: TaskType }) => {
  const barIconsStyles = { marginLeft: '0.25rem', marginRight: '0.25rem' }

  return (
    <Card>
      <ActionArea>
        <Content>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Stack direction="row" flexWrap="wrap">
              {task.priority ? (
                <TbAlertSquareRounded size={22} style={{ ...barIconsStyles }} />
              ) : (
                <TbAlertSquareRoundedOff size={22} style={{ ...barIconsStyles }} />
              )}
              {task.description && <BsTextParagraph size={22} style={{ ...barIconsStyles }} />}
            </Stack>
            <AvatarGroup spacing="small">
              {task.assingee.map((a, idx) => (
                <Avatar
                  key={idx}
                  alt={a.name}
                  src={a.image}
                  tooltip={a.name}
                  sx={{ width: 30, height: 30 }}
                />
              ))}
            </AvatarGroup>
          </Stack>
          <Typography>{task.title}</Typography>
          <Stack direction="row" flexWrap="wrap" mt={1}>
            {task.tags.map((tag, idx) => (
              <Chip
                key={idx}
                label={tag.name}
                sx={{ backgroundColor: tag.color, marginBottom: '0.5rem', marginRight: '0.5rem' }}
              />
            ))}
          </Stack>
        </Content>
      </ActionArea>
    </Card>
  )
}

export default TaskCard
