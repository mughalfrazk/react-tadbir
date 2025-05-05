import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useTheme } from '@mui/material'

import { Card } from '@/components/mui'
import { TaskType } from '@/pages/dashboard/board/project'

import SortableItem from './SortableItem'

const Column = ({
  id,
  title,
  tasks,
  dragTask,
  activeColumn
}: {
  id: string
  title: string
  tasks: TaskType[]
  dragTask: TaskType | null
  activeColumn: string | null
}) => {
  const theme = useTheme()
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className="rounded">
      <h3 className="font-bold mb-2">
        {id}: {title}
      </h3>
      <Card
        sx={{
          padding: 1,
          width: 300,
          minWidth: 300,
          overflowY: 'auto',
          overflowX: 'hidden',
          height: 'calc(100vh - 220px)',
          backgroundColor: theme.palette.grey[900],
          border: activeColumn === id ? 1 : 1,
          borderColor: activeColumn === id ? theme.palette.primary.main : theme.palette.grey[900]
        }}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableItem key={task.id} id={task.id} task={task} dragTask={dragTask} />
          ))}
        </SortableContext>
      </Card>
    </div>
  )
}

export default Column
