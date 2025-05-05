import { type ISourceOptions, MoveDirection, OutMode } from '@tsparticles/engine'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim' // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { useEffect, useMemo, useState } from 'react'

import { Box, Container as MuiContainer, Stack, Typography } from '@/components/mui'

const HomePage = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  // const particlesLoaded = async (container?: Container): Promise<void> => {
  //   console.log(container)
  // }

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'black'
        }
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push'
          },
          onHover: {
            enable: true,
            mode: 'repulse'
          }
        },
        modes: {
          push: {
            quantity: 8
          },
          repulse: {
            distance: 200,
            duration: 0.4
          }
        }
      },
      particles: {
        color: {
          value: '#ffffff'
        },
        links: {
          color: '#ffffff',
          distance: 200,
          enable: true,
          opacity: 0.3,
          width: 1
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out
          },
          random: false,
          speed: 6,
          straight: false
        },
        number: {
          density: {
            enable: false
          },
          value: 120
        },
        opacity: {
          value: 0.3
        },
        shape: {
          type: 'circle'
        },
        size: {
          value: { min: 1, max: 5 }
        }
      },
      detectRetina: true
    }),
    []
  )

  if (init) {
    return (
      <Box>
        <MuiContainer
          sx={{
            height: 'calc(100vh - 4rem)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Stack direction="column" alignItems="center" textAlign="center" gap={4}>
            <Typography sx={{ fontSize: '3.5rem', fontWeight: '900' }} color="secondary">
              turning <span className="text-tadbir-primary">chaos</span> to{' '}
              <span className="text-tadbir-primary">control</span>
            </Typography>
            <Typography variant="h2" fontWeight="light" width="80%">
              A modern project management tool designed to streamline teamwork, organize tasks, and
              keep projects moving forward with ease.
            </Typography>
          </Stack>
        </MuiContainer>
        <Particles
          id="tsparticles"
          // particlesLoaded={particlesLoaded}
          options={options}
        />
      </Box>
    )
  }
}

export default HomePage
