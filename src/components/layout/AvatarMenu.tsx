import DashboardIcon from '@mui/icons-material/Dashboard'
import { useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { TbLogout2 } from 'react-icons/tb'
import { useNavigate } from 'react-router'

import { useAuth } from '@/context/auth-context'

import { Avatar, ItemIcon, Menu, MenuItem } from '../mui'
import IconButton from '../mui/IconButton'

const AvatarMenu = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { session, logoutHandler } = useAuth()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string>('')
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const goToDashboard = () => {
    navigate('/dashboard')
  }

  useEffect(() => {
    if (session?.photoUrl) {
      setPhotoUrl(session?.photoUrl)
    }
  }, [session])

  return (
    <div>
      <IconButton
        aria-controls={open ? 'avatar-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ width: 32, height: 32 }}
      >
        <Avatar src={photoUrl} sx={{ width: 32, height: 32 }} />
      </IconButton>
      <Menu id="avatar-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
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
