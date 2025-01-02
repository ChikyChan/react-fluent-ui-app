import {
  Button,
  makeStyles,
  Menu,
  MenuButton,
  MenuItem,
  MenuPopover,
  MenuTrigger,
  Persona,
  tokens,
} from '@fluentui/react-components'
import { Hamburger } from '@fluentui/react-nav-preview'

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

type InternalAppBarProps = {
  onHambugerClick: () => void
} & AppBarProps

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
})

export const AppBar = (props: InternalAppBarProps) => {
  const classes = useClasses()

  return (
    <>
      <header className={classes.root}>
        <Hamburger
          className={classes.hambuger}
          onClick={props.onHambugerClick}
        />
        <h2 className={classes.systemName}>{props.systemName}</h2>
        {props.authentication.requireAuthentication ? (
          props.authentication.isAuthenticated ? (
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <MenuButton appearance='transparent' menuIcon={null}>
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
                </MenuButton>
              </MenuTrigger>
              <MenuPopover>
                <MenuItem>Sign Out</MenuItem>
              </MenuPopover>
            </Menu>
          ) : (
            <Button appearance="transparent">Sign In</Button>
          )
        ) : null}
      </header>
    </>
  )
}
