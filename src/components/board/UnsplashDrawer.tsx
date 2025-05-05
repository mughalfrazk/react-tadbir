import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import { getPhotoListApi } from '../../lib/unsplash/photos.service'
import { Button, Stack, TextField } from '../mui'

const UnsplashDrawer = ({ onClose }: { onClose: () => void }) => {
  const [searchText, setSearchText] = useState<string>('')

  const getPhotosList = useCallback(async () => {
    if (!searchText) return

    try {
      const result = await getPhotoListApi(searchText)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }, [searchText])

  useEffect(() => {
    getPhotosList()
  }, [getPhotosList])

  return (
    <Stack width={350}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pl={2.5}
        pr={1}
        py={1}
      >
        <Typography>Background Images</Typography>
        <Button isIconOnly size="small" onClick={onClose}>
          <CloseRoundedIcon />
        </Button>
      </Stack>
      <TextField
        size="small"
        value={searchText}
        placeholder="Search keyword"
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ px: 2 }}
      />
    </Stack>
  )
}

export default UnsplashDrawer
