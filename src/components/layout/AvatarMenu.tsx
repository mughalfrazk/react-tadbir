import DashboardIcon from '@mui/icons-material/Dashboard'
import { useTheme } from '@mui/material'
import { useState } from 'react'
import { TbLogout2 } from 'react-icons/tb'
import { useNavigate } from 'react-router'

import { useAuth } from '@/context/auth-context'

import { Avatar, ItemIcon, Menu, MenuItem } from '../mui'

const AvatarMenu = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { session, logoutHandler } = useAuth()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const goToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div>
      <Avatar
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ width: 32, height: 32 }}
        src={session?.photoUrl}
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
        <MenuItem onClick={goToDashboard}>
          <ItemIcon>
            <DashboardIcon sx={{ fontSize: 20 }} />
          </ItemIcon>
          Dashboard
        </MenuItem>
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
