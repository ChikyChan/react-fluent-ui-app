import { makeStyles, tokens } from '@fluentui/react-components'

export type FooterProps = {
  environment: string
  copyRight: string
}

const useClasses = makeStyles({
  root: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    flex: 0,
    padding: `${tokens.spacingHorizontalXS} 0`,
    textAlign: 'center',
  },
})

export const Footer = () => {
  const classes = useClasses()

  return (
    <footer className={classes.root}>
      <span>Development</span>
      <span> | </span>
      <span>© 2024 Chiky Chen</span>
    </footer>
  )
}
