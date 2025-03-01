import { DndContext } from '@dnd-kit/core'
import Column from '../../components/board/Column'
import Stack from '../../components/mui/Stack'
import { project } from './project'

const BoardPage = () => {
  return (
    <DndContext>
      {/* <Typography>{project.project_name}</Typography> */}
      <Stack direction="row" spacing={2}>
        {project.board.map((p, idx) => (
          <Column key={idx} column={p} />
        ))}
      </Stack>
    </DndContext>
  )
}

export default BoardPage
