import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MyProjects } from './pages/MyProjects'
import { Contact } from './pages/Contact'
import { createContext, useState } from 'react'
import { type UseThemeProps } from './hooks/useTheme'
import { AboutMe } from './pages/AboutMe/AboutMe'

const init: UseThemeProps = { theme: 'black', switchTheme: () => {} }
export const ThemeContext = createContext(init)
export const App = (): JSX.Element => {
  const localTheme = localStorage.getItem('mehdi-seddik-theme-mode') ?? 'light'
  const [theme, setTheme] = useState<'black' | 'light'>(
    localTheme as 'black' | 'light',
  )

  const handleSwitchTheme = () => {
    if (theme === 'black') {
      setTheme('light')
      localStorage.setItem('mehdi-seddik-theme-mode', 'light')
    } else if (theme === 'light') {
      setTheme('black')
      localStorage.setItem('mehdi-seddik-theme-mode', 'black')
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
