import { Dispatch, SetStateAction, createContext, useContext } from 'react'

export type ToastType = 'success' | 'error' | 'info'

export type GlobalStateContextType = {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  notification: string
  setNotification: Dispatch<SetStateAction<string>>
  showToast: (message: string | { title: string; message: string }, type?: ToastType) => void
}

const GlobalStateContext = createContext<GlobalStateContextType>({
  loading: false,
  setLoading: () => {},
  notification: '',
  setNotification: () => {},
  showToast: () => {}
})

export default GlobalStateContext
export const useGlobalState = () => useContext(GlobalStateContext)
