import { PropsWithChildren, useMemo } from 'react'
import { NavigationContext } from './navigation-context'

export const NavigationProvider = (props: PropsWithChildren) => {
  const navigaionGroups = useMemo(() => {
    return {
      groups: [],
    }
  }, [])

  return (
    <NavigationContext.Provider value={navigaionGroups}>
      {props.children}
    </NavigationContext.Provider>
  )
}
