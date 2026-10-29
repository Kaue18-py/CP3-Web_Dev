import { useTheme } from '../../hooks/useTheme'
import { Button } from '../ui/Button'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      className="px-2"
    >
      [{isDark ? '☾ dark' : '☀ light'}]
    </Button>
  )
}
