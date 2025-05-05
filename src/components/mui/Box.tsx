import { BoxProps, Box as MuiBox } from '@mui/material'

const Box = ({ children, ...otherProps }: BoxProps) => {
  return <MuiBox {...otherProps}>{children}</MuiBox>
}

export default Box
