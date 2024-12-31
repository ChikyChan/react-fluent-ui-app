export type NavigationGroup = {
  items: NavigationItem[]
}

type NavigationItem = {
  children: NavigationSubItem[]
} & NavigationSubItem

type NavigationSubItem = {
  icon: string
  url: string
  title: string
}

export type NavigationProviderType = {
  groups: NavigationGroup[]
}