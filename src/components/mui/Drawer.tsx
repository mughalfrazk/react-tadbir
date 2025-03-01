import { ReactNode } from 'react'
import { Drawer as MuiDrawer, DrawerProps } from '@mui/material'

const Drawer = ({ children, ...otherProps }: { children: ReactNode } & DrawerProps) => {
  return <MuiDrawer {...otherProps}>{children}</MuiDrawer>
}

export default Drawer
