import {
  Avatar as MuiAvatar,
  AvatarGroup as Group,
  AvatarGroupProps,
  AvatarProps,
  Tooltip
} from '@mui/material'

export const AvatarGroup = ({ children, ...otherProps }: AvatarGroupProps) => {
  return <Group {...otherProps}>{children}</Group>
}

const Avatar = ({ tooltip, ...otherProps }: { tooltip?: string } & AvatarProps) => {
  return tooltip ? (
    <Tooltip title={tooltip}>
      <MuiAvatar {...otherProps} />
    </Tooltip>
  ) : (
    <MuiAvatar {...otherProps} />
  )
}

export default Avatar
