import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ColorModeContext = createContext()

function ColorModeProvider({ children }) {
  const [colorMode, setColorMode] = useLocalStorage('light', 'colorMode')

  function toggleColorMode() {
    setColorMode((colorMode) => (colorMode === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    document.documentElement.className = colorMode
  }, [colorMode])

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}

function useColorMode() {
  const context = useContext(ColorModeContext)
  if (!context) throw new Error('ColorModeContext used outside provider.')
  return context
}

export { ColorModeProvider, useColorMode }
