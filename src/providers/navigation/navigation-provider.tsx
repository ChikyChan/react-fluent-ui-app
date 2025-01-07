import { PropsWithChildren, useMemo } from 'react'
import {
  Album20Filled,
  Album20Regular,
  bundleIcon,
  Person20Filled,
  Person20Regular,
} from '@fluentui/react-icons'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigator } from '../../components'
import {
  HomePage,
  PageFive,
  PageFour,
  PageNotFound,
  PageOne,
  PageThree,
  PageTwo,
} from '../../pages'
import { env } from '../../utilities'
import { NavigationContext } from './navigation-context'
import {
  isNavigationGroup,
  isNavigationItem,
  isNavigationItemWithChildren,
  NavigationContextNavigationItemCollectionType,
  NavigationItem,
} from './types'

type NavigationProviderProps = PropsWithChildren & {
  open: boolean
  handleHambugerClick: () => void
  onNavigatorOpenChange: (open: boolean) => void
}

export const NavigationProvider = (props: NavigationProviderProps) => {
  const Album = bundleIcon(Album20Filled, Album20Regular)
  const Person = bundleIcon(Person20Filled, Person20Regular)

  const navigaionItems: NavigationContextNavigationItemCollectionType =
    useMemo(() => {
      return [
        {
          title: 'Section 1',
          items: [
            {
              title: 'Group 1',
              icon: Album,
              children: [
                {
                  component: PageOne,
                  title: 'Page 1',
                  icon: Person,
                  path: '/page-one',
                },
                {
                  component: PageTwo,
                  title: 'Page 2',
                  path: '/page-two',
                },
              ],
            },
            {
              component: PageThree,
              title: 'Page 3',
              path: '/page-three',
            },
          ],
        },
        'divider',
        {
          title: 'Section 2',
          items: [
            {
              component: PageFour,
              title: 'Page 4',
              icon: Person,
              path: '/page-four',
            },
            {
              component: PageFive,
              title: 'Page 5',
              path: '/page-five',
            },
          ],
        },
      ] as NavigationContextNavigationItemCollectionType
    }, [Person, Album])

  const routes = useMemo(() => {
    const renderRoute = (
      it: Exclude<NavigationItem, 'divider'>,
    ): ReturnType<typeof Route> => {
      return (
        <Route
          key={it.path}
          path={it.path}
          element={it.component ? <it.component /> : null}
        />
      )
    }

    const flatNavigationItems = [] as NavigationItem[]

    navigaionItems.forEach((it) => {
      if (isNavigationItem(it)) {
        flatNavigationItems.push(it)
      } else if (isNavigationGroup(it)) {
        it.items.forEach((item) => {
          if (isNavigationItem(item)) {
            flatNavigationItems.push(item)
          } else if (isNavigationItemWithChildren(item)) {
            item.children.forEach((child) => {
              flatNavigationItems.push(child)
            })
          }
        })
      }
    })

    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        {flatNavigationItems
          .map((it) => renderRoute(it))}
        <Route path="/not-found" element={<PageNotFound />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    )
  }, [navigaionItems])

  return (
    <NavigationContext.Provider
      value={{
        items: navigaionItems,
        routes: routes,
      }}
    >
      <BrowserRouter basename={env.BASE_URL ?? '/'}>
        <Navigator
          open={props.open}
          navigationItems={navigaionItems}
          onHambugerClick={props.handleHambugerClick}
          onOpenChange={props.onNavigatorOpenChange}
        />
        {props.children}
      </BrowserRouter>
    </NavigationContext.Provider>
  )
}
