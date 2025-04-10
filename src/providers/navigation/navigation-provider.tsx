import { PropsWithChildren, useMemo } from 'react'
import {
  Album20Filled,
  Album20Regular,
  bundleIcon,
  Home20Filled,
  Home20Regular,
  Person20Filled,
  Person20Regular,
} from '@fluentui/react-icons'
import { createBrowserRouter, RouteObject } from 'react-router'
import {
  HomePage,
  PageFive,
  PageFour,
  PageNotFound,
  PageOne,
  PageThree,
  PageTwo,
} from '../../pages'
import { NavigationContext } from './navigation-context'
import {
  isNavigationGroup,
  isNavigationItem,
  isNavigationItemWithChildren,
  NavigationContextNavigationItemCollectionType,
} from './types'
import { Layout } from '../../components'

type NavigationProviderProps = PropsWithChildren

export const NavigationProvider = (props: NavigationProviderProps) => {
  const Album = bundleIcon(Album20Filled, Album20Regular)
  const Person = bundleIcon(Person20Filled, Person20Regular)
  const Home = bundleIcon(Home20Filled, Home20Regular)

  const navigaionItems: NavigationContextNavigationItemCollectionType =
    useMemo(() => {
      return [
        {
          title: 'Home',
          icon: Home,
          element: <HomePage />,
        },
        {
          title: 'Section 1',
          items: [
            {
              title: 'Group 1',
              icon: Album,
              children: [
                {
                  element: <PageOne />,
                  title: 'Page 1',
                  icon: Person,
                  path: '/page-one',
                },
                {
                  element: <PageTwo />,
                  title: 'Page 2',
                  path: '/page-two',
                },
              ],
            },
            {
              element: <PageThree />,
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
              element: <PageFour />,
              title: 'Page 4',
              icon: Person,
              path: '/page-four',
            },
            {
              element: <PageFive />,
              title: 'Page 5',
              path: '/page-five',
            },
          ],
        },
      ] as NavigationContextNavigationItemCollectionType
    }, [Person, Album, Home])

  const router = useMemo(() => {
    const flatNavigationItems = [] as RouteObject[]

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

    return createBrowserRouter([
      {
        Component: Layout,
        children: flatNavigationItems.concat([
          {
            path: 'not-found',
            element: <PageNotFound />,
          },
          {
            path: '*',
            element: <PageNotFound />,
          },
        ]),
      },
    ])
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
