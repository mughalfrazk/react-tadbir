import { MenuItemProps, MenuProps, Menu as MuiMenu, MenuItem as MuiMenuItem } from '@mui/material'

export const MenuItem = ({ children, ...otherProps }: MenuItemProps) => {
  return <MuiMenuItem {...otherProps}>{children}</MuiMenuItem>
}

const Menu = ({ children, ...otherProps }: MenuProps) => {
  return <MuiMenu {...otherProps}>{children}</MuiMenu>
}

export default Menu
