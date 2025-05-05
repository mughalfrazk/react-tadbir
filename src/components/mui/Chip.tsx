import { ChipProps, Chip as MuiChip } from '@mui/material'

const Chip = ({ children, ...otherProps }: ChipProps) => {
  return <MuiChip {...otherProps}>{children}</MuiChip>
}

export default Chip
