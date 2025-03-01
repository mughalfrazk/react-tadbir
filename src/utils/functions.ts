import { CSSObject, Theme } from '@mui/material'

export const lightDark = (light: CSSObject, dark: CSSObject, def?: CSSObject) => {
  const l = () => light
  const d = (theme: Theme) => theme.applyStyles('dark', dark)
  return def ? [def, d, l] : [d, l]
}
