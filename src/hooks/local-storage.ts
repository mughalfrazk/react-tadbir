import { useState } from 'react'

import { getFromLocalStorage, saveToLocalStorage } from '@/utils/functions'

export const useLocalStorage = (keyName: string, defaultValue: unknown) => {
  const [storedValue, setStoredValue] = useState(() => {
    const value = getFromLocalStorage(keyName)

    // const currentDate = new Date();
    // if (value && new Date(value.exp) > currentDate) {
    if (value) {
      return value
    } else {
      saveToLocalStorage(keyName, JSON.stringify(defaultValue))
      return defaultValue
    }
  })

  const setValue = (newValue: unknown) => {
    saveToLocalStorage(keyName, JSON.stringify(newValue))
    setStoredValue(newValue)
  }

  return [storedValue, setValue]
}
