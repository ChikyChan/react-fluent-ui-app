import React, { useCallback, useMemo } from 'react'
import { Tooltip } from '@fluentui/react-components'
import {
  bundleIcon,
  Dismiss20Filled,
  Dismiss20Regular,
} from '@fluentui/react-icons'
import {
  AppItemStatic,
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
import { useNavigate } from 'react-router-dom'

export type NavigatorProps = {
  open: boolean
  systemName: string
  navigationItems: NavigationContextNavigationItemCollectionType
  onHambugerClick: () => void
  onOpenChange: (open: boolean) => void
}

export const Navigator = (props: NavigatorProps) => {
  const Dismiss = bundleIcon(Dismiss20Filled, Dismiss20Regular)
  const navigate = useNavigate()

  const handleOnSelect = useCallback((value, categoryValue) => {

  }, [])

  const HambugerWithTooltip = useMemo(
    () => (
      <Tooltip content={props.systemName} relationship="label">
        <Hamburger onClick={props.onHambugerClick} />
      </Tooltip>
    ),
    [props.systemName, props.onHambugerClick],
  )

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
        onNavItemSelect={handleOnSelect}
      >
        <NavDrawerHeader>{HambugerWithTooltip}</NavDrawerHeader>

        <NavDrawerBody>
          <AppItemStatic>{props.systemName}</AppItemStatic>

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
