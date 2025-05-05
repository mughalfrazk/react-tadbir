import { Popover as MuiPopover, PopoverProps } from '@mui/material'

const Popover = ({ children, ...otherProps }: PopoverProps) => {
  return <MuiPopover {...otherProps}>{children}</MuiPopover>
}

export default Popover
