import { Snackbar as MuiSnackbar, SnackbarProps } from '@mui/material'

const Snackbar = ({ children, ...otherProps }: SnackbarProps) => {
  return <MuiSnackbar {...otherProps}>{children}</MuiSnackbar>
}

export default Snackbar
