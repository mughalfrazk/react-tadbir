import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material'

const Tooltip = ({ children, ...otherProps }: TooltipProps) => {
  return (
    <MuiTooltip sx={{ ...otherProps.sx }} {...otherProps}>
      {children}
    </MuiTooltip>
  )
}

export default Tooltip
