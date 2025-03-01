import { Paper as MuiPaper, PaperProps } from '@mui/material'
import { ReactNode } from 'react'

const Paper = ({ children, ...otherProps }: { children: ReactNode } & PaperProps) => {
  return <MuiPaper {...otherProps}>{children}</MuiPaper>
}

export default Paper
