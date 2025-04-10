import { FluentIcon } from '@fluentui/react-icons'
import { createBrowserRouter, RouteObject } from 'react-router'

export type NavigationGroup = {
  title: string
  items: (NavigationItemWithChildren | NavigationItem)[]
}

export type NavigationItemWithChildren = {
  icon?: FluentIcon
  title: string
  children: NavigationItem[]
}

export type NavigationItem = Exclude<RouteObject, 'children'> & {
  icon?: FluentIcon
  title: string
}

export type NavigationContextNavigationItemType =
  | NavigationGroup
  | NavigationItemWithChildren
  | NavigationItem
  | 'divider'

export type NavigationContextNavigationItemCollectionType =
  NavigationContextNavigationItemType[]

export type NavigationContextType = {
  items: NavigationContextNavigationItemCollectionType
  router: ReturnType<typeof createBrowserRouter>
}

export const isNavigationGroup = (
  item: NavigationContextNavigationItemType,
): item is NavigationGroup => {
  return item !== 'divider' && 'items' in item
}

export const isNavigationItemWithChildren = (
  item: NavigationContextNavigationItemType,
): item is NavigationItemWithChildren => {
  return item !== 'divider' && 'children' in item
}

export const isNavigationItem = (
  item: NavigationContextNavigationItemType,
): item is NavigationItem => {
  return item !== 'divider' && 'element' in item
}
