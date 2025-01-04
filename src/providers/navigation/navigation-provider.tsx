import { PropsWithChildren, useMemo } from 'react'
import {
  Album20Filled,
  Album20Regular,
  bundleIcon,
  Person20Filled,
  Person20Regular,
} from '@fluentui/react-icons'
import { NavigationContext } from './navigation-context'
import { NavigationContextItemCollectionType } from './types'

export const NavigationProvider = (props: PropsWithChildren) => {
  const Album = bundleIcon(Album20Filled, Album20Regular)
  const Person = bundleIcon(Person20Filled, Person20Regular)

  const navigaionGroups: NavigationContextItemCollectionType = useMemo(() => {
    return [
      {
        title: 'Section 1',
        items: [
          {
            title: 'Group 1',
            icon: Album,
            children: [
              {
                title: 'Page 1',
                icon: Person,
                url: '',
              },
              {
                title: 'Page 2',
                url: '',
              },
            ],
          },
          {
            title: 'Page 3',
            url: '',
          },
        ],
      },
      'divider',
      {
        title: 'Section 2',
        items: [
          {
            title: 'Page 4',
            icon: Person,
            url: '',
          },
          {
            title: 'Page 5',
            url: '',
          },
        ],
      },
    ]
  }, [Person, Album])

  return (
    <NavigationContext.Provider value={navigaionGroups}>
      {props.children}
    </NavigationContext.Provider>
  )
}
