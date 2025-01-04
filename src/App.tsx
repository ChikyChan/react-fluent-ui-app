import { useState } from 'react'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { Layout } from './components'
import { NavigationProvider } from './providers'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <FluentProvider theme={webLightTheme}>
      <NavigationProvider>
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
         />
      </NavigationProvider>
    </FluentProvider>
  )
}

export default App
