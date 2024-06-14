import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MyProjects } from './pages/MyProjects'
import { AboutMe } from './pages/AboutMe'
import { Contact } from './pages/Contact'
import { createContext, useState } from 'react'
import { type UseThemeProps } from './hooks/useTheme'

export type Theme = 'black' | 'light';
const init: UseThemeProps = { theme: 'black', switchTheme: () => {} };
export const ThemeContext = createContext(init);

export const App = (): JSX.Element => {
  const localTheme: Theme = localStorage.getItem('mehdi-seddik-theme-mode') ?? 'light'
  const [theme, setTheme] = useState<Theme>(localTheme);

  const handleSwitchTheme = (): void => {
    setTheme(theme);
    localStorage.setItem('mehdi-seddik-theme-mode', theme);
  }

  return (
    <ThemeContext.Provider value={{ theme, switchTheme: handleSwitchTheme }}>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/projects" element={MyProjects} />
            <Route path="/contact" element={Contact} />
            <Route path="/" element={AboutMe} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  )
}
