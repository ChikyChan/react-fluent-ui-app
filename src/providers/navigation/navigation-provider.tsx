import { PropsWithChildren, useMemo } from 'react'
import {
  Album20Filled,
  Album20Regular,
  bundleIcon,
  Person20Filled,
  Person20Regular,
} from '@fluentui/react-icons'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { PageFive, PageFour, PageOne, PageThree, PageTwo } from '../../pages'
import { NavigationContext } from './navigation-context'
import {
  isNavigationGroup,
  isNavigationItem,
  isNavigationItemWithChildren,
  NavigationContextNavigationItemCollectionType,
  NavigationItem,
} from './types'

export const NavigationProvider = (props: PropsWithChildren) => {
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

  const router = useMemo(() => {
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <></>,
      },
    ]
    const toRouteObject = (
      it: Exclude<NavigationItem, 'divider'>,
    ): RouteObject => {
      return {
        element: <it.component />,
        path: it.path,
      }
    }
    navigaionItems.forEach((it) => {
      if (isNavigationGroup(it)) {
        it.items.forEach((child) => {
          if (isNavigationItem(child)) {
            routes.push(toRouteObject(child))
          }
        })
      } else if (isNavigationItemWithChildren(it)) {
        it.children.forEach((child) => {
          routes.push(toRouteObject(child))
        })
      } else if (isNavigationItem(it)) {
        routes.push(toRouteObject(it))
      }
    })
    return createBrowserRouter(routes)
  }, [navigaionItems])

  return (
    <NavigationContext.Provider
      value={{
        items: navigaionItems,
        router: router,
      }}
    >
      {props.children}
    </NavigationContext.Provider>
  )
}
