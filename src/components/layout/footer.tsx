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

export const Footer = (props: FooterProps) => {
  const classes = useClasses()

  return (
    <footer className={classes.root}>
      <span>{props.environment}</span>
      <span> | </span>
      <span>{props.copyRight}</span>
    </footer>
  )
}
