import { FluentIcon } from "@fluentui/react-icons"

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

export const isNavigationGroup = (
  item: NavigationGroup | NavigationItemWithChildren | NavigationItem,
): item is NavigationGroup => {
  return 'items' in item
}

export const isNavigationItemWithChildren = (
  item: NavigationGroup | NavigationItemWithChildren | NavigationItem,
): item is NavigationItemWithChildren => {
  return 'children' in item
}

export const isNavigationItem = (
  item: NavigationGroup | NavigationItemWithChildren | NavigationItem,
): item is NavigationItem => {
  return !('children' in item)
}
