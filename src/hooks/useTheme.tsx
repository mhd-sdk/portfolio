import { useContext } from 'react'
import { ThemeContext, Theme } from '../App'

export interface UseThemeProps {
  theme: Theme
  switchTheme: () => void
};

export const useTheme = (): UseThemeProps => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
