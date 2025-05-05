import { CircularProgressProps, CircularProgress as MuiCircularProgress } from '@mui/material'

const CircularProgress = ({ ...otherProps }: CircularProgressProps) => {
  return <MuiCircularProgress {...otherProps} />
}

export default CircularProgress
