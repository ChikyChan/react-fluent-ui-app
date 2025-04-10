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
import { useNavigate } from 'react-router'
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
  const navigate = useNavigate()
  const Dismiss = bundleIcon(Dismiss20Filled, Dismiss20Regular)

  const handleNavItemClick = useCallback(
    (it: NavigationItem) => {
      if (it.path) {
        navigate(it.path)
      }
      props.onHambugerClick()
    },
    [props, navigate],
  )

  const renderNavigationItem = useCallback(
    (it: NavigationItem, sectionName?: string) => (
      <NavItem
        icon={it.icon ? <it.icon /> : <Dismiss />}
        key={`nav-item-${it.title}`}
        value={sectionName ? `${sectionName}-${it.title}` : it.title}
        onClick={() => handleNavItemClick(it)}
      >
        {it.title}
      </NavItem>
    ),
    [handleNavItemClick, Dismiss],
  )

  const renderNavigationChildItem = useCallback(
    (it: NavigationItem, categoryName: string, sectionName?: string) => (
      <NavSubItem
        key={
          sectionName
            ? `nav-section-${sectionName}-category-${categoryName}-sub-item-${it.title}`
            : `nav-category-${categoryName}-sub-item-${it.title}`
        }
        value={
          sectionName
            ? `${sectionName}-${categoryName}-${it.title}`
            : `${categoryName}-${it.title}`
        }
        onClick={() => handleNavItemClick(it)}
      >
        {it.title}
      </NavSubItem>
    ),
    [handleNavItemClick],
  )

  const renderNavigationItemWithChildren = useCallback(
    (it: NavigationItemWithChildren, sectionName?: string) => (
      <NavCategory
        key={
          sectionName
            ? `nav-section-${sectionName}-category-${it.title}`
            : `nav-category-${it.title}`
        }
        value={it.title}
      >
        <NavCategoryItem
          key={`nav-category-item-${it.title}`}
          icon={it.icon ? <it.icon /> : <Dismiss />}
        >
          {it.title}
        </NavCategoryItem>
        <NavSubItemGroup
          key={
            sectionName
              ? `nav-section-${sectionName}-sub-item-group-${it.title}`
              : `nav-sub-item-group-${it.title}`
          }
        >
          {it.children.map((child) =>
            renderNavigationChildItem(child, it.title, sectionName),
          )}
        </NavSubItemGroup>
      </NavCategory>
    ),
    [renderNavigationChildItem, Dismiss],
  )

  const renderNavigationGroup = useCallback(
    (gp: NavigationGroup) => (
      <React.Fragment key={`nav-section-${gp.title}`}>
        <NavSectionHeader>{gp.title}</NavSectionHeader>
        {gp.items.map((it) =>
          isNavigationItemWithChildren(it)
            ? renderNavigationItemWithChildren(it, gp.title)
            : isNavigationItem(it)
              ? renderNavigationItem(it, gp.title)
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
