import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ViewKanbanRoundedIcon from '@mui/icons-material/ViewKanbanRounded'

import ProjectBoard from '@/components/board'
import BoardHeader from '@/components/board/BoardHeader'
import BreadCrumbBackground from '@/components/common/BreadCrumbBackground'
import { Divider } from '@/components/mui'

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
      <BoardHeader />
      <Divider sx={{ my: 2 }} />
      <ProjectBoard />
    </BreadCrumbBackground>
  )
}

export default ProjectDetailPage
