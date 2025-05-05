import { CollapseProps, Collapse as MuiCollapse } from '@mui/material'

const Collapse = ({ children, ...otherProps }: CollapseProps) => {
  return <MuiCollapse {...otherProps}>{children}</MuiCollapse>
}

export default Collapse
