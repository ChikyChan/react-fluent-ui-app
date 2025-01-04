import { createContext } from 'react'
import { NavigationContextItemCollectionType } from './types'

export const NavigationContext = createContext<NavigationContextItemCollectionType>([])
