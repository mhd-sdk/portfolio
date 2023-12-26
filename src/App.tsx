import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MyProjects } from './pages/MyProjects'
import { AboutMe } from './pages/AboutMe'
import { Contact } from './pages/Contact'
import { createContext, useState } from 'react'
import { type UseThemeProps } from './hooks/useTheme'

const init: UseThemeProps = { theme: 'dim', switchTheme: () => {} }
export const ThemeContext = createContext(init)
export const App = (): JSX.Element => {
  // if theme found in local storage, set it
  const localTheme = localStorage.getItem('mehdi-seddik-theme-mode') ?? 'dim'
  const [theme, setTheme] = useState<'dim' | 'light'>(
    localTheme as 'dim' | 'light'
  )

  const handleSwitchTheme = () => {
    if (theme === 'dim') {
      setTheme('light')
      localStorage.setItem('mehdi-seddik-theme-mode', 'light')
    } else if (theme === 'light') {
      setTheme('dim')
      localStorage.setItem('mehdi-seddik-theme-mode', 'dim')
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, switchTheme: handleSwitchTheme }}>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AboutMe />} />
            <Route path="/projects" element={<MyProjects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  )
}
