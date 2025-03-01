import { ReactNode } from 'react'
import { Box as MuiBox, BoxProps } from '@mui/material'

const Box = ({ children, ...otherProps }: { children: ReactNode } & BoxProps) => {
  return <MuiBox {...otherProps}>{children}</MuiBox>
}

export default Box
