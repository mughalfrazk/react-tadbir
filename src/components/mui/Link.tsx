import { LinkProps, Link as MuiLink } from '@mui/material'

const Link = ({ children, ...otherProps }: LinkProps) => {
  return <MuiLink {...otherProps}>{children}</MuiLink>
}

export default Link
