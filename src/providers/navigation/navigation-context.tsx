import { createContext } from 'react'
import { NavigationProviderType } from './types'

export const NavigationContext = createContext<NavigationProviderType>({
  groups: [],
})
