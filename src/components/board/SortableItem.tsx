import { FC } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

import { TaskType } from '../../pages/board/project'
import TaskCard from './TaskCard'

export type SortableItemProps = {
  id: string
  task: TaskType
  activeTask: TaskType | null
}

const SortableItem: FC<SortableItemProps> = ({ id, task, activeTask }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id
  })

  const style = {
    margin: '10px',
    transform: CSS.Transform.toString(transform),
    zIndex: 1000,
    opacity: activeTask?.id === id ? 0.5 : 1
  }

  // if (activeTask?.id === id) return <h1>Picked Up</h1>

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <TaskCard task={task} />
    </div>
  )
}

export default SortableItem
