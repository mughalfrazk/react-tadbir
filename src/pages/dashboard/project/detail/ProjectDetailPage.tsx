import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ViewKanbanRoundedIcon from '@mui/icons-material/ViewKanbanRounded'

import BoardHeader from '@/components/board/BoardHeader'
import ProjectBoard from '@/components/board/DndSection'
import BreadCrumbBackground from '@/components/common/BreadCrumbBackground'
import { Divider } from '@/components/mui'
import BoardProvider from '@/providers/board-provider'

const ProjectDetailPage = () => {
  const links = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <HomeRoundedIcon sx={{ fontSize: 20 }} />
    },
    {
      title: 'Project Board',
      icon: <ViewKanbanRoundedIcon sx={{ fontSize: 20 }} />
    }
  ]

  return (
    <BreadCrumbBackground
      links={links}
      paperProps={{ sx: { height: 'calc(100vh - 7rem)', border: 1, borderColor: 'divider' } }}
      containerProps={{ maxWidth: 'xl' }}
    >
      <BoardProvider>
        <BoardHeader />
        <Divider sx={{ my: 2 }} />
        <ProjectBoard />
      </BoardProvider>
    </BreadCrumbBackground>
  )
}

export default ProjectDetailPage
