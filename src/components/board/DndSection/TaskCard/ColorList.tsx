import * as colors from '@mui/material/colors'
import { Dispatch, SetStateAction } from 'react'

import { Box, Grid, Stack } from '@/components/mui'

const colorList = [
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'yellow',
  'amber',
  'orange',
  'deepOrange',
  'brown',
  'grey',
  'blueGrey'
]

const ColorList = ({
  color: selectedColor,
  setColor
}: {
  color: string
  setColor: Dispatch<SetStateAction<string>>
}) => {
  const muiColors = colorList.map((colorName) => {
    const color = colors[colorName as keyof typeof colors]
    return {
      name: colorName,
      // @ts-expect-error Ignore type checking
      hex: color[600]
    }
  })

  return (
    <Stack flexDirection="row" flexWrap="wrap" gap={1} p={1.5}>
      {muiColors.map((color) => (
        <Grid key={color.name}>
          <Box
            sx={{
              width: 35,
              height: 35,
              backgroundColor: color.hex,
              borderRadius: '0.2rem',
              border: selectedColor === color.hex ? '2px solid white' : `2px solid ${color.hex}`,
              cursor: 'pointer'
            }}
            onClick={() => {
              setColor(color.hex)
            }}
            title={color.name}
          />
        </Grid>
      ))}
    </Stack>
  )
}

export default ColorList
