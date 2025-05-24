import { Fragment, useState } from 'react'
import { AiFillPicture } from 'react-icons/ai'

import { Button, Drawer, Stack, Typography } from '../mui'
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
        pt={1}
        pb={0}
      >
        <Stack gap={0.5}>
          <Typography variant="h3">Ipro Fix</Typography>
          <Typography variant="body1">Mobile retailer software</Typography>
        </Stack>
        <Button isIconOnly variant="contained" onClick={() => setShowBgDrawer(true)}>
          <AiFillPicture size={24} />
        </Button>
      </Stack>
    </Fragment>
  )
}

export default BoardHeader
