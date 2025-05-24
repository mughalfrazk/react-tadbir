import { useColorScheme } from '@mui/material'

const useColorMode = () => {
  const scheme = useColorScheme()

  const lightDark = (light: string | number | undefined, dark: string | number | undefined) => {
    return scheme.mode === 'light' ? light : dark
  }

  return { ...scheme, lightDark }
}

export default useColorMode
