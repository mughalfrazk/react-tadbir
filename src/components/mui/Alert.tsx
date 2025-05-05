import {
  AlertProps,
  AlertTitleProps,
  Alert as MuiAlert,
  AlertTitle as MuiAlertTitle
} from '@mui/material'

export const AlertTitle = ({ children, ...otherProps }: AlertTitleProps) => {
  return <MuiAlertTitle {...otherProps}>{children}</MuiAlertTitle>
}

const Alert = ({ children, ...otherProps }: AlertProps) => {
  return <MuiAlert {...otherProps}>{children}</MuiAlert>
}

export default Alert
