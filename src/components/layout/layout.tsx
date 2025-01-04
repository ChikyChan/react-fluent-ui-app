import { useCallback, useContext, useState } from 'react'
import { makeStyles } from '@fluentui/react-components'
import { RouterProvider } from 'react-router-dom'
import { NavigationContext } from '../../providers'
import { AppBar, AppBarProps } from './app-bar'
import { Content, ContentProps } from './content'
import { Footer, FooterProps } from './footer'
import { Navigator } from './navigator'

type LayoutProps = AppBarProps & FooterProps & ContentProps

const useClasses = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    height: '100vh',
  },
})

export const Layout = (props: LayoutProps) => {
  const classes = useClasses()
  const navigationContext = useContext(NavigationContext)

  const [navigatorOpen, setNavigatorOpen] = useState(false)

  const handleHambugerClick = useCallback(() => {
    setNavigatorOpen(!navigatorOpen)
  }, [navigatorOpen])

  const onNavigatorOpenChange = useCallback((open: boolean) => {
    setNavigatorOpen(open)
  }, [])

  return (
    <div className={classes.root}>
      <Navigator
        {...props}
        open={navigatorOpen}
        navigationItems={navigationContext.items}
        onHambugerClick={handleHambugerClick}
        onOpenChange={onNavigatorOpenChange}
      />
      <AppBar {...props} onHambugerClick={handleHambugerClick} />
      <Content>
        <RouterProvider router={navigationContext.router} />
      </Content>
      <Footer {...props} />
    </div>
  )
}
