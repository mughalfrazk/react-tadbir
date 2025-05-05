import { Paper as MuiPaper, PaperProps } from '@mui/material'

const Paper = ({ children, ...otherProps }: PaperProps) => {
  return <MuiPaper {...otherProps}>{children}</MuiPaper>
}

export default Paper
