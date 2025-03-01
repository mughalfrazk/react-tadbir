import { Chip as MuiChip, ChipProps } from '@mui/material'

const Chip = ({ ...otherProps }: ChipProps) => {
  return <MuiChip {...otherProps} size="small" sx={{ borderRadius: '0.2rem', ...otherProps.sx }} />
}

export default Chip
