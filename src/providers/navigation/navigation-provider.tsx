import { PropsWithChildren, useMemo } from 'react'
import { Album20Filled, Album20Regular, bundleIcon, Person20Filled, Person20Regular } from '@fluentui/react-icons'
import { NavigationContext } from './navigation-context'

export const NavigationProvider = (props: PropsWithChildren) => {
  const Album = bundleIcon(Album20Filled, Album20Regular)
  const Person = bundleIcon(Person20Filled, Person20Regular)

  const navigaionGroups = useMemo(() => {
    return [
      {
        title: 'Section 1',
        items: [
          {
            title: 'Group 1',
            icon: Album,
            children: [
              {
                title: 'Item 1',
                icon: Person,
                url: '',
              },
              {
                title: 'Item 2',
                icon: 'icon',
                url: '',
              },
            ],
          },
          {
            title: 'Item 3',
            icon: 'icon',
            url: '',
          },
        ],
      },
      {
        title: 'Section 2',
        items: [
          {
            title: 'Item 4',
            icon: Person,
            url: '',
          },
          {
            title: 'Item 5',
            icon: 'icon',
            url: '',
          },
        ],
      },
    ]
  }, [Album])

  return (
    <NavigationContext.Provider value={navigaionGroups}>
      {props.children}
    </NavigationContext.Provider>
  )
}
