import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { Layout } from './components'

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Layout
        authentication={{
          requireAuthentication: true,
          isAuthenticated: true,
          currentUser: {
            username: 'chiky',
            displayName: 'Chiky Chen',
          },
        }}
        systemName="Fluent UI React Sample App"
        environment="Development"
        copyRight="© 2024 Chiky Chen"
      >
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
        <h1>Hello, World!</h1>
      </Layout>
    </FluentProvider>
  )
}

export default App
