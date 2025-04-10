import { useCallback, useContext, useState } from 'react'
import {
  makeStyles,
  tokens,
} from '@fluentui/react-components'
import { Hamburger } from '@fluentui/react-nav-preview'
import { NavigationContext } from '../../providers'
import { Navigator } from '../navigator'

const useClasses = makeStyles({
  root: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    display: 'flex',
    flexDirection: 'row',
    flex: 0,
    padding: `0 ${tokens.spacingHorizontalL}`,
  },
  hambuger: {
    color: tokens.colorNeutralForegroundOnBrand,
    marginRight: tokens.spacingHorizontalXS,
    ':hover': {
      color: tokens.colorBrandBackground2Hover,
    },
  },
  systemName: {
    flex: 'auto',
  },
  userInfoPrimaryText: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
})

export const AppBar = () => {
  const [navigatorOpen, setNavigatorOpen] = useState(false)

  const handleHambugerClick = useCallback(
    () => setNavigatorOpen((prev) => !prev),
    [],
  )

  const navigationContext = useContext(NavigationContext)

  const classes = useClasses()

  return (
    <>
      <Navigator
        open={navigatorOpen}
        navigationItems={navigationContext.items}
        onHambugerClick={handleHambugerClick}
        onOpenChange={setNavigatorOpen}
      />
      <header className={classes.root}>
        <Hamburger className={classes.hambuger} onClick={handleHambugerClick} />
        <h2 className={classes.systemName}>Fluent UI React Sample App</h2>
      </header>
    </>
  )
}
