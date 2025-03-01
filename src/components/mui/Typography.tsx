import { Typography as MuiTypography, TypographyProps } from '@mui/material'
import { ReactNode } from 'react'

const Typography = ({ children, ...otherProps }: { children: ReactNode } & TypographyProps) => {
  return <MuiTypography {...otherProps}>{children}</MuiTypography>
}

export default Typography
