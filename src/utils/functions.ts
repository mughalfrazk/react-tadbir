import { CSSObject, Theme } from '@mui/material'

export const lightDark = (light: CSSObject, dark: CSSObject, def?: CSSObject) => {
  const l = () => light
  const d = (theme: Theme) => theme.applyStyles('dark', dark)
  return def ? [def, d, l] : [d, l]
}

export function saveToLocalStorage(key: string, value: string) {
  const parsedValue = typeof value === 'object' ? JSON.stringify(value) : value
  localStorage.setItem(key, parsedValue)
}

export function getFromLocalStorage(key: string) {
  const value: string | null = localStorage.getItem(key)
  if (!value) return null

  return JSON.parse(value)
}
