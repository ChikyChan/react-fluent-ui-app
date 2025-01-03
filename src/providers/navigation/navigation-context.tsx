import { createContext } from 'react'
import { NavigationGroup, NavigationItem, NavigationItemWithChildren } from './types'

export const NavigationContext = createContext<(NavigationGroup | NavigationItemWithChildren | NavigationItem)[]>([])
