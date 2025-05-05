import { DividerProps, Divider as MuiDivider } from '@mui/material'

const Divider = ({ ...otherProps }: DividerProps) => {
  return <MuiDivider {...otherProps} />
}

export default Divider
