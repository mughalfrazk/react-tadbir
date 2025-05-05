import { DrawerProps, Drawer as MuiDrawer } from '@mui/material'

const Drawer = ({ children, ...otherProps }: DrawerProps) => {
  return <MuiDrawer {...otherProps}>{children}</MuiDrawer>
}

export default Drawer
