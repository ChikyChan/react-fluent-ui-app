import { Tooltip } from '@fluentui/react-components'
import { AppItem, Hamburger, NavDrawer, NavDrawerBody, NavDrawerHeader } from '@fluentui/react-nav-preview'
import { NavigationGroup } from '../../providers'

export type NavigatorProps = {
  open: boolean
  systemName: string
  navigationGroups: NavigationGroup[]
  onHambugerClick: () => void
}

export const Navigator = (props: NavigatorProps) => {
  const HambugerWithTooltip = (
    <Tooltip content={props.systemName} relationship="label">
      <Hamburger onClick={props.onHambugerClick} />
    </Tooltip>
  )

  return (
    <nav>
      <NavDrawer open={props.open}>
        <NavDrawerHeader>{HambugerWithTooltip}</NavDrawerHeader>

        <NavDrawerBody>
          <AppItem>{props.systemName}</AppItem>
        </NavDrawerBody>
      </NavDrawer>
    </nav>
  )
}
