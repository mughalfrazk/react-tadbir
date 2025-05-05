import { Fragment, useState } from 'react'
import { AiFillPicture } from 'react-icons/ai'

import { Box, Button, Drawer, Stack, Typography } from '../mui'
import UnsplashDrawer from './UnsplashDrawer'

const BoardHeader = () => {
  const [showBgDrawer, setShowBgDrawer] = useState<boolean>(false)

  const closeDrawerHandelr = () => {
    setShowBgDrawer(false)
  }

  return (
    <Fragment>
      <Drawer anchor="right" open={showBgDrawer} onClose={closeDrawerHandelr}>
        <UnsplashDrawer onClose={closeDrawerHandelr} />
      </Drawer>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        m={0}
        px={3.5}
        pt={2}
        pb={0}
      >
        <Box>
          <Typography variant="h6">Ipro Fix</Typography>
          <Typography variant="subtitle1">project.description</Typography>
        </Box>
        <Button isIconOnly variant="contained" onClick={() => setShowBgDrawer(true)}>
          <AiFillPicture size={24} />
        </Button>
      </Stack>
    </Fragment>
  )
}

export default BoardHeader
