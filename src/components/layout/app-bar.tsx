import { useCallback, useContext, useState } from 'react'
import { makeStyles, Persona, tokens } from '@fluentui/react-components'
import { Hamburger } from '@fluentui/react-nav-preview'
import { NavigationContext } from '../../providers'
import { Navigator } from './navigator'

export type AppBarProps = {
  systemName: string
  authentication: {
    requireAuthentication: boolean
    isAuthenticated: boolean
    currentUser: {
      username: string
      displayName: string
      avatar?: string
    }
  }
}

const useClasses = makeStyles({
  root: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
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
  signInButton: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
})

export const AppBar = (props: AppBarProps) => {
  const classes = useClasses()
  const navigationContext = useContext(NavigationContext)

  const [navigatorOpen, setNavigatorOpen] = useState(false)

  const handleHambugerClick = useCallback(() => {
    setNavigatorOpen(!navigatorOpen)
  }, [navigatorOpen])

  return (
    <>
      <Navigator
        {...props}
        open={navigatorOpen}
        navigationGroups={navigationContext.groups}
      />
      <header className={classes.root}>
        <Hamburger className={classes.hambuger} onClick={handleHambugerClick} />
        <h2 className={classes.systemName}>{props.systemName}</h2>
        {props.authentication.requireAuthentication ? (
          props.authentication.isAuthenticated ? (
            <Persona
              avatar={{
                image: {
                  src: props.authentication.currentUser.avatar,
                },
              }}
              primaryText={{
                className: classes.userInfoPrimaryText,
              }}
              name={props.authentication.currentUser.displayName}
              textAlignment="center"
            />
          ) : (
            <button className={classes.signInButton}>Sign in</button>
          )
        ) : null}
      </header>
    </>
  )
}
