import DashboardIcon from '@mui/icons-material/Dashboard'
import { useTheme } from '@mui/material'
import { useState } from 'react'
import { TbLogout2 } from 'react-icons/tb'

import { useAuth } from '@/context/auth-context'

import { Avatar, ItemIcon, Menu, MenuItem } from '../mui'

const AvatarMenu = () => {
  const theme = useTheme()
  const { logoutHandler } = useAuth()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Avatar
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ width: 36, height: 36 }}
      />
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleClose}>
          <ItemIcon>
            <DashboardIcon sx={{ fontSize: 20 }} />
          </ItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem
          sx={(theme) => ({ color: theme.palette.error.main })}
          onClick={() => {
            logoutHandler()
            handleClose()
          }}
        >
          <ItemIcon>
            <TbLogout2 color={theme.palette.error.main} size={20} />
          </ItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}

export default AvatarMenu
