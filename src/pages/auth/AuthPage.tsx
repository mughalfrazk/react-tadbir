import { red } from '@mui/material/colors'
import { FirebaseError } from 'firebase/app'
import { FaGoogle } from 'react-icons/fa'
import { useNavigate } from 'react-router'

import AuthBg from '@/assets/auth-bg.png'
import AuthVector from '@/assets/auth.png'
import { Box, Button, Container, Grid, Stack, Typography } from '@/components/mui'
import { useGlobalState } from '@/context/global-state-context'
import { signInWithGooglePopup } from '@/lib/firebase/auth.service'

const AuthPage = () => {
  const navigate = useNavigate()
  const { showToast } = useGlobalState()

  const googleSignIn = async () => {
    try {
      await signInWithGooglePopup()
      navigate('/dashboard/project')
    } catch (error) {
      const e = error as FirebaseError
      showToast(e.message, 'error')
    }
  }

  return (
    <Box
      height="100vh"
      sx={{
        backgroundImage: `url(${AuthBg})`,
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Container>
        <Grid container spacing={3}>
          <Grid size="grow">
            <Stack
              height="100%"
              direction="column"
              justifyContent="center"
              gap={1}
              textAlign="center"
            >
              <Typography variant="h2" fontWeight={900}>
                Get started with Tadbir
              </Typography>
              <Typography variant="body1" mb={3}>
                Sign up or log in to start planning smarter and managing projects with ease.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: red[400] }}
                startIcon={<FaGoogle />}
                onClick={googleSignIn}
              >
                Google
              </Button>
              {/* <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: grey[900] }}
                startIcon={<FaGithub />}
              >
                Github
              </Button> */}
            </Stack>
          </Grid>
          <Grid size={8}>
            <img src={AuthVector} alt="Auth" width={600} className="drop-shadow-xl my-0 mx-auto" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default AuthPage
