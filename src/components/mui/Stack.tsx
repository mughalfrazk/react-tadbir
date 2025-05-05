import { Stack as MuiStack, StackProps } from '@mui/material'

const Stack = ({ children, ...otherProps }: StackProps) => {
  return <MuiStack {...otherProps}>{children}</MuiStack>
}

export default Stack
