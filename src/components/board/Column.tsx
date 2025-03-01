import { useTheme } from '@mui/material'
import { ColumnType } from '../../pages/board/project'
import Card from '../mui/Card'
import Stack from '../mui/Stack'
import Typography from '../mui/Typography'
import TaskCard from './TaskCard'
import { lightDark } from '../../utils/functions'

const Column = ({ column }: { column: ColumnType }) => {
  const theme = useTheme()

  return (
    <Card
      sx={lightDark(
        {
          width: 300,
          minWidth: 300,
          height: 'calc(100vh - 120px)',
          backgroundColor: theme.palette.grey[50]
        },
        {
          backgroundColor: theme.palette.grey[900]
        }
      )}
    >
      <Typography m={2} mb={0} px={1} sx={{ fontWeight: 'bold' }}>
        {column.column_name}
      </Typography>
      <Stack p={2} spacing={1}>
        {column.tasks.map((task, idx) => (
          <TaskCard key={idx} task={task} />
        ))}
      </Stack>
    </Card>
  )
}

export default Column
