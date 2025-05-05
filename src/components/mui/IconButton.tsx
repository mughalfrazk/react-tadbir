import { IconButtonProps, IconButton as MuiIconButton } from '@mui/material'

const IconButton = ({ children, ...otherProps }: IconButtonProps) => {
  return (
    <MuiIconButton sx={{ mt: 1, ...otherProps.sx }} {...otherProps}>
      {children}
    </MuiIconButton>
  )
}

export default IconButton
