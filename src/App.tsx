import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import AppProvider from './providers/app-provider'
import BoardPage from './pages/board'
import './App.css'

function App() {
  return (
    <AppProvider>
      <BoardPage />
    </AppProvider>
  )
}

export default App
