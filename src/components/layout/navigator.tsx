import { useCallback, useMemo } from 'react'
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
  NavigationContextItemCollectionType,
  NavigationGroup,
  NavigationItem,
  NavigationItemWithChildren,
} from '../../providers'

export type NavigatorProps = {
  open: boolean
  systemName: string
  navigationItems: NavigationContextItemCollectionType
  onHambugerClick: () => void
  onOpenChange: (open: boolean) => void
}

export const Navigator = (props: NavigatorProps) => {
  const Dismiss = bundleIcon(Dismiss20Filled, Dismiss20Regular)

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
        <NavItem icon={it.icon ? <it.icon /> : <Dismiss />} value={it.title}>
          {it.title}
        </NavItem>
      </>
    ),
    [Dismiss],
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
          <NavCategoryItem icon={it.icon ? <it.icon /> : <Dismiss />}>
            {it.title}
          </NavCategoryItem>
          <NavSubItemGroup>
            {it.children.map((child) => renderNavigationChildItem(child))}
          </NavSubItemGroup>
        </NavCategory>
      </>
    ),
    [renderNavigationChildItem, Dismiss],
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
            it === 'divider' ? (
              <NavDivider />
            ) : isNavigationGroup(it) ? (
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
