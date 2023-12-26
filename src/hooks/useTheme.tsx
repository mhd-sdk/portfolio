import { useContext } from 'react'
import { ThemeContext } from '../App'

export interface UseThemeProps {
  theme: 'light' | 'dim'
  switchTheme: () => void
}

export const useTheme = (): UseThemeProps => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
