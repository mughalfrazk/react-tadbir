import { ButtonProps, IconButton, Button as MuiButton } from '@mui/material'

import Tooltip from './Tooltip'

const Button = ({
  sx,
  children,
  border,
  tooltip,
  isIconOnly,
  ...otherProps
}: { tooltip?: string; border?: boolean; isIconOnly?: boolean } & ButtonProps) => {
  const py = otherProps.size === 'small' ? { height: 30, py: 0 } : {}
  const style = { ...sx }
  if (isIconOnly) {
    const borderStyles = border ? { border: 1, borderColor: 'divider' } : {}

    return (
      <IconButton sx={{ ...style, ...borderStyles }} {...otherProps}>
        {children}
      </IconButton>
    )
  }

  const Button = (
    <MuiButton sx={{ ...style, ...sx, ...py }} {...otherProps}>
      {children}
    </MuiButton>
  )

  if (tooltip)
    return (
      <Tooltip title={tooltip} placement="top">
        {Button}
      </Tooltip>
    )

  return Button
}

export default Button
