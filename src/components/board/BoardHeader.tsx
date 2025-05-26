import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded'
import { Fragment, useState } from 'react'

import { Button, Drawer, Modal, Stack, Typography } from '../mui'
import ContributorsModal from './ContributorsModal'
import UnsplashDrawer from './UnsplashDrawer'

const BoardHeader = () => {
  const [showBgDrawer, setShowBgDrawer] = useState<boolean>(false)
  const [showProjectUsersModal, setShowProjectUsersModal] = useState<boolean>(false)
  const closeUsersModalHandler = () => setShowProjectUsersModal(false)

  const closeDrawerHandelr = () => {
    setShowBgDrawer(false)
  }

  return (
    <Fragment>
      <Modal
        open={showProjectUsersModal}
        onClose={closeUsersModalHandler}
        title="Contributors"
        width={500}
        minHeight="60vh"
      >
        <ContributorsModal />
      </Modal>
      <Drawer anchor="right" open={showBgDrawer} onClose={closeDrawerHandelr}>
        <UnsplashDrawer onClose={closeDrawerHandelr} />
      </Drawer>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        m={0}
        px={3.5}
        pt={1}
        pb={0}
      >
        <Stack gap={0.5}>
          <Typography variant="h3">Ipro Fix</Typography>
          <Typography variant="body1">Mobile retailer software</Typography>
        </Stack>
        <Stack flexDirection="row" gap={1}>
          <Button isIconOnly variant="contained" onClick={() => setShowProjectUsersModal(true)}>
            <GroupAddRoundedIcon sx={{ fontSize: 26 }} />
          </Button>
          {/* <Button isIconOnly variant="contained" onClick={() => setShowBgDrawer(true)}>
            <AiFillPicture size={24} />
          </Button> */}
        </Stack>
      </Stack>
    </Fragment>
  )
}

export default BoardHeader
