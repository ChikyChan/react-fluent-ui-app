import { useCallback, useState } from 'react'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { Layout } from './components'
import { NavigationProvider } from './providers'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [navigatorOpen, setNavigatorOpen] = useState(false)
  const handleNavigatorOpenChange = useCallback(
    (open: boolean) => setNavigatorOpen(open),
    [],
  )
  const handleHambugerClick = useCallback(
    () => setNavigatorOpen(!navigatorOpen),
    [navigatorOpen],
  )

  return (
    <FluentProvider theme={webLightTheme}>
      <NavigationProvider
        open={navigatorOpen}
        handleHambugerClick={handleHambugerClick}
        onNavigatorOpenChange={handleNavigatorOpenChange}
      >
        <Layout
          authentication={{
            requireAuthentication: true,
            isAuthenticated: isAuthenticated,
            currentUser: {
              username: 'chiky',
              displayName: 'Chiky Chen',
            },
          }}
          systemName="Fluent UI React Sample App"
          environment="Development"
          copyRight="© 2024 Chiky Chen"
          handleSignIn={() => setIsAuthenticated(true)}
          handleSignOut={() => setIsAuthenticated(false)}
          onHambugerClick={handleHambugerClick}
        />
      </NavigationProvider>
    </FluentProvider>
  )
}

export default App
