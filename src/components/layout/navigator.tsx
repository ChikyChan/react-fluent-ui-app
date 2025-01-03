import { useCallback, useMemo } from 'react'
import { Tooltip } from '@fluentui/react-components'
import {
  AppItemStatic,
  Hamburger,
  NavCategory,
  NavCategoryItem,
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
  NavigationGroup,
  NavigationItem,
  NavigationItemWithChildren,
} from '../../providers'

export type NavigatorProps = {
  open: boolean
  systemName: string
  navigationItems: (
    | NavigationGroup
    | NavigationItemWithChildren
    | NavigationItem
  )[]
  onHambugerClick: () => void
  onOpenChange: (open: boolean) => void
}

export const Navigator = (props: NavigatorProps) => {
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
      <>
        <NavItem icon={it.icon && <it.icon />} value={it.title}>
          {it.title}
        </NavItem>
      </>
    ),
    [],
  )

  const renderNavigationChildItem = useCallback(
    (it: NavigationItem) => (
      <>
        <NavSubItem value={it.title}>{it.title}</NavSubItem>
      </>
    ),
    [],
  )

  const renderNavigationItemWithChildren = useCallback(
    (it: NavigationItemWithChildren) => (
      <>
        <NavCategory value={it.title}>
          <NavCategoryItem icon={it.icon && <it.icon />}>{it.title}</NavCategoryItem>
          <NavSubItemGroup>
            {it.children.map((child) => renderNavigationChildItem(child))}
          </NavSubItemGroup>
        </NavCategory>
      </>
    ),
    [renderNavigationChildItem],
  )

  const renderNavigationGroup = useCallback(
    (gp: NavigationGroup) => (
      <>
        <NavSectionHeader>{gp.title}</NavSectionHeader>
        {gp.items.map((it) =>
          isNavigationItemWithChildren(it) ? (
            renderNavigationItemWithChildren(it)
          ) : isNavigationItem(it) ? (
            renderNavigationItem(it)
          ) : (
            <></>
          ),
        )}
      </>
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
        <NavDrawerHeader>{HambugerWithTooltip}</NavDrawerHeader>

        <NavDrawerBody>
          <AppItemStatic>{props.systemName}</AppItemStatic>

          {props.navigationItems.map((it) =>
            isNavigationGroup(it) ? (
              renderNavigationGroup(it)
            ) : isNavigationItemWithChildren(it) ? (
              renderNavigationItemWithChildren(it)
            ) : isNavigationItem(it) ? (
              renderNavigationItem(it)
            ) : (
              <></>
            ),
          )}
        </NavDrawerBody>
      </NavDrawer>
    </nav>
  )
}
