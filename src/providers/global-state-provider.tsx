import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { ToastContainer, ToastContentProps, toast } from 'react-toastify'

import { Alert, AlertTitle } from '@/components/mui'
import GlobalStateContext from '@/context/global-state-context'

type ErrorType = 'success' | 'error' | 'info'

export type GlobalStateType = {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  notification: string
  setNotification: Dispatch<SetStateAction<string>>
  showMessage: (message: string | { title?: string; message: string }, type?: ErrorType) => void
}

function CustomAlert({
  data: { title, message, errorType }
}: ToastContentProps<{ title?: string; message: string; errorType: ErrorType }>) {
  return (
    <Alert
      variant="filled"
      severity={errorType}
      sx={{
        width: '100%',
        '&.MuiPaper-root': {
          borderRadius: '0.35rem'
        }
      }}
    >
      <AlertTitle mb={0}>{title ?? errorType.toLocaleUpperCase()}</AlertTitle>
      {message}
    </Alert>
  )
}

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<string>('')
  const [, setErrorType] = useState<ErrorType>('info')
  const [loading, setLoading] = useState<boolean>(false)

  const showToast = (
    message: string | { message: string; title: string } = 'Notification!',
    type: ErrorType = 'info'
  ) => {
    setErrorType(type)
    toast(CustomAlert, {
      autoClose: 8000,
      customProgressBar: false,
      closeButton: true,
      theme: 'colored',
      data:
        typeof message === 'string'
          ? { message, errorType: type }
          : { ...message, errorType: type },
      style: { padding: 0 }
    })
  }

  return (
    <GlobalStateContext.Provider
      value={{
        loading,
        setLoading,
        notification,
        setNotification,
        showToast
      }}
    >
      <ToastContainer />
      {children}
    </GlobalStateContext.Provider>
  )
}

export default GlobalStateProvider
