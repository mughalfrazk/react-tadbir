import { Typography as MuiTypography, TypographyProps } from '@mui/material'

const Typography = ({ children, ...otherProps }: TypographyProps) => {
  return <MuiTypography {...otherProps}>{children}</MuiTypography>
}

export default Typography
