import { PropsWithChildren } from 'react'
import { AppBar, AppBarProps } from './app-bar'
import { Content, ContentProps } from './content'
import { Footer, FooterProps } from './footer'
import { makeStyles } from '@fluentui/react-components'

type LayoutProps = AppBarProps & FooterProps & ContentProps & PropsWithChildren

const useClasses = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
  },
})

export const Layout = (props: LayoutProps) => {
  const classes = useClasses()

  return (
    <div className={classes.root}>
      <AppBar {...props} />
      <Content>{props.children}</Content>
      <Footer {...props} />
    </div>
  )
}
