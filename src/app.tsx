import { useContext } from 'react'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { RouterProvider } from 'react-router'
import { NavigationContext, NavigationProvider } from './providers'

function Content() {
  const navigationContext = useContext(NavigationContext)
  return <RouterProvider router={navigationContext.router} />
}

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <NavigationProvider>
        <Content />
      </NavigationProvider>
    </FluentProvider>
  )
}

export default App
