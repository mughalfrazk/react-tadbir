import { LinearProgressProps, LinearProgress as MuiLinearProgress } from '@mui/material'

const LinearProgress = ({ ...otherProps }: LinearProgressProps) => {
  return <MuiLinearProgress {...otherProps} />
}

export default LinearProgress
