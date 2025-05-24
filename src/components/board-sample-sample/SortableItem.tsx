import { useSortable } from '@dnd-kit/sortable'

import { TaskModel } from '@/lib/models/task.model'

import TaskCard from './TaskCard'

const SortableItem = ({
  id,
  task,
  dragTask
}: {
  id: string
  task: TaskModel
  dragTask: TaskModel | null
}) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`mb-2 cursor-grab`}
      style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined }}
    >
      <div className={`${dragTask?.id === id ? 'invisible' : 'visible'}`}>
        <TaskCard task={task} />
      </div>
    </div>
  )
}

export default SortableItem
