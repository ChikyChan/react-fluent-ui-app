import { ComponentType } from 'react'
import { FluentIcon } from '@fluentui/react-icons'
import { createBrowserRouter, Routes } from 'react-router-dom'

export type NavigationGroup = {
  title: string
  items: (NavigationItemWithChildren | NavigationItem)[]
}

export type NavigationItemWithChildren = {
  children: NavigationItem[]
} & Pick<NavigationItem, 'title' | 'icon'>

export type NavigationItem = {
  icon?: FluentIcon
  isLink: boolean
  path: string
  title: string
  component: ComponentType
}

export type NavigationContextNavigationItemType =
  | NavigationGroup
  | NavigationItemWithChildren
  | NavigationItem
  | 'divider'

export type NavigationContextNavigationItemCollectionType = NavigationContextNavigationItemType[]

export type NavigationContextType = {
  items: NavigationContextNavigationItemCollectionType,
  routes: ReturnType<typeof Routes>,
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
  return item !== 'divider' && 'component' in item
}
