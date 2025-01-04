import { FluentIcon } from '@fluentui/react-icons'

export type NavigationGroup = {
  title: string
  items: (NavigationItemWithChildren | NavigationItem)[]
}

export type NavigationItemWithChildren = {
  children: NavigationItem[]
} & NavigationItem

export type NavigationItem = {
  icon?: FluentIcon
  url?: string
  title: string
}

export type NavigationContextItemType =
  | NavigationGroup
  | NavigationItemWithChildren
  | NavigationItem
  | 'divider'

export type NavigationContextItemCollectionType = NavigationContextItemType[]

export const isNavigationGroup = (
  item: NavigationContextItemType,
): item is NavigationGroup => {
  return item !== 'divider' && 'items' in item
}

export const isNavigationItemWithChildren = (
  item: NavigationContextItemType,
): item is NavigationItemWithChildren => {
  return item !== 'divider' && 'children' in item
}

export const isNavigationItem = (
  item: NavigationContextItemType,
): item is NavigationItem => {
  return item !== 'divider' && !('children' in item)
}
