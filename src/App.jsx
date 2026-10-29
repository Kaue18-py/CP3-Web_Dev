import { ThemeProvider } from './contexts/ThemeProvider'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
