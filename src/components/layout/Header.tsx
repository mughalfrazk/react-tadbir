import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { TbLogin2 } from 'react-icons/tb'

import { useAuth } from '@/context/auth-context'

import { Button, Container, Stack } from '../mui'
import AvatarMenu from './AvatarMenu'
import CircularProgress from '../mui/CircularProgress'

const Header = ({ handleDrawerOpen, open }: { handleDrawerOpen: () => void; open: boolean }) => {
  const auth = useAuth()
  return (
    <Container>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center">
          {auth.accessToken && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  mr: 2
                },
                open && { display: 'none' }
              ]}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h4">Tadbir</Typography>
        </Stack>
        {auth.loading ? (
          <CircularProgress size="30px" />
        ) : auth.accessToken ? (
          <AvatarMenu />
        ) : (
          <Button component="a" href="/auth" variant="outlined" startIcon={<TbLogin2 />}>
            Login
          </Button>
        )}
      </Toolbar>
    </Container>
  )
}

export default Header
