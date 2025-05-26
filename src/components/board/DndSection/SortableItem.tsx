import { useSortable } from '@dnd-kit/sortable'

import { useBoard } from '@/context/board-context'
import { TaskWithAssigneesModel } from '@/lib/models/task.model'

import TaskCard from './TaskCard'

const SortableItem = ({ id, task }: { id: string; task: TaskWithAssigneesModel }) => {
  const { dragTask } = useBoard()
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
