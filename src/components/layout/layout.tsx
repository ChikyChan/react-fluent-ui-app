import { makeStyles } from '@fluentui/react-components'
import { AppBar } from './app-bar'
import { Content } from './content'
import { Footer } from './footer'
import { Outlet } from 'react-router'
import { memo } from 'react'

const useClasses = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    height: '100vh',
  },
})

export const Layout = memo(() => {
  const classes = useClasses()

  return (
    <div className={classes.root}>
      <AppBar />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </div>
  )
})
