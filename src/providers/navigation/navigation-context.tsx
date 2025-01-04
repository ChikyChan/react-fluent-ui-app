import { createContext } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { NavigationContextType } from './types'

export const NavigationContext = createContext<NavigationContextType>({
  items: [],
  router: createBrowserRouter([
    {
      path: '',
      element: <></>,
    },
  ]),
})
