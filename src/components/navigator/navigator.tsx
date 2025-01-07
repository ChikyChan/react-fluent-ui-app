import React, { useCallback } from 'react'
import {
  bundleIcon,
  Dismiss20Filled,
  Dismiss20Regular,
} from '@fluentui/react-icons'
import {
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview'
import {
  isNavigationGroup,
  isNavigationItem,
  isNavigationItemWithChildren,
  NavigationContextNavigationItemCollectionType,
  NavigationGroup,
  NavigationItem,
  NavigationItemWithChildren,
} from '../../providers'

export type NavigatorProps = {
  open: boolean
  navigationItems: NavigationContextNavigationItemCollectionType
  onHambugerClick: () => void
  onOpenChange: (open: boolean) => void
}

export const Navigator = (props: NavigatorProps) => {
  const Dismiss = bundleIcon(Dismiss20Filled, Dismiss20Regular)

  const renderNavigationItem = useCallback(
    (it: NavigationItem) => (
      <NavItem
        href={it.isLink ? it.path : undefined}
        icon={it.icon ? <it.icon /> : <Dismiss />}
        key={`nav-item-${it.title}`}
        value={it.title}
      >
        {it.title}
      </NavItem>
    ),
    [Dismiss],
  )

  const renderNavigationChildItem = useCallback(
    (it: NavigationItem) => (
      <NavSubItem
        href={it.isLink ? it.path : undefined}
        key={`nav-sub-item-${it.title}`}
        value={it.title}
      >
        {it.title}
      </NavSubItem>
    ),
    [],
  )

  const renderNavigationItemWithChildren = useCallback(
    (it: NavigationItemWithChildren) => (
      <NavCategory key={`nav-category-${it.title}`} value={it.title}>
        <NavCategoryItem
          key={`nav-category-item-${it.title}`}
          icon={it.icon ? <it.icon /> : <Dismiss />}
        >
          {it.title}
        </NavCategoryItem>
        <NavSubItemGroup key={`nav-sub-item-group-${it.title}`}>
          {it.children.map((child) => renderNavigationChildItem(child))}
        </NavSubItemGroup>
      </NavCategory>
    ),
    [renderNavigationChildItem, Dismiss],
  )

  const renderNavigationGroup = useCallback(
    (gp: NavigationGroup) => (
      <React.Fragment key={`nav-group-${gp.title}`}>
        <NavSectionHeader>{gp.title}</NavSectionHeader>
        {gp.items.map((it) =>
          isNavigationItemWithChildren(it)
            ? renderNavigationItemWithChildren(it)
            : isNavigationItem(it)
              ? renderNavigationItem(it)
              : null,
        )}
      </React.Fragment>
    ),
    [renderNavigationItemWithChildren, renderNavigationItem],
  )

  return (
    <nav>
      <NavDrawer
        open={props.open}
        onOpenChange={(_, { open }) => props.onOpenChange(open)}
        separator
      >
        <NavDrawerHeader>
          <Hamburger onClick={props.onHambugerClick} />
        </NavDrawerHeader>

        <NavDrawerBody>
          {props.navigationItems.map((it, idx) =>
            it === 'divider' ? (
              <NavDivider key={`nav-divider-${idx}`} />
            ) : isNavigationGroup(it) ? (
              renderNavigationGroup(it)
            ) : isNavigationItemWithChildren(it) ? (
              renderNavigationItemWithChildren(it)
            ) : isNavigationItem(it) ? (
              renderNavigationItem(it)
            ) : null,
          )}
        </NavDrawerBody>
      </NavDrawer>
    </nav>
  )
}
