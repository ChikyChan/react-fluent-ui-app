import { useContext } from 'react'
import { makeStyles } from '@fluentui/react-components'
import { NavigationContext } from '../../providers'
import { AppBar, AppBarProps } from './app-bar'
import { Content, ContentProps } from './content'
import { Footer, FooterProps } from './footer'

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

  return (
    <div className={classes.root}>
      <AppBar {...props} />
      <Content>
        {navigationContext.routes}
      </Content>
      <Footer {...props} />
    </div>
  )
}
