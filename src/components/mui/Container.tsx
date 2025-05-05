import { ContainerProps, Container as MuiContainer } from '@mui/material'

const Container = ({ children, ...otherProps }: ContainerProps) => {
  return <MuiContainer {...otherProps}>{children}</MuiContainer>
}

export default Container
