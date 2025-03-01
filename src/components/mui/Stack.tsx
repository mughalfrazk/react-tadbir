import { Stack as MuiStack, StackProps } from '@mui/material'
import { ReactNode } from 'react'

const Stack = ({ children, ...otherProps }: { children: ReactNode } & StackProps) => {
  return <MuiStack {...otherProps}>{children}</MuiStack>
}

export default Stack
