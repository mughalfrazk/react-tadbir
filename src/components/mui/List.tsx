import {
  ListItemAvatar,
  ListItemAvatarProps,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemIconProps,
  ListItemProps,
  ListItemText,
  ListItemTextProps,
  ListProps,
  List as MuiList,
  ListItem as MuiListItem
} from '@mui/material'

export const ItemButton = ({ children, ...otherProps }: ListItemButtonProps) => {
  return <ListItemButton {...otherProps}>{children}</ListItemButton>
}

export const ItemText = ({ children, ...otherProps }: ListItemTextProps) => {
  return <ListItemText {...otherProps}>{children}</ListItemText>
}

export const ItemAvatar = ({ children, ...otherProps }: ListItemAvatarProps) => {
  return <ListItemAvatar {...otherProps}>{children}</ListItemAvatar>
}

export const ItemIcon = ({ children, ...otherProps }: ListItemIconProps) => {
  return <ListItemIcon {...otherProps}>{children}</ListItemIcon>
}

export const ListItem = ({ children, ...otherProps }: ListItemProps) => {
  return <MuiListItem {...otherProps}>{children}</MuiListItem>
}

const List = ({ children, ...otherProps }: ListProps) => {
  return <MuiList {...otherProps}>{children}</MuiList>
}

export default List
