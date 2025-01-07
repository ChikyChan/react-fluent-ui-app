import { PropsWithChildren } from 'react'
import { makeStyles, tokens } from '@fluentui/react-components'

export type ContentProps = {} & PropsWithChildren

const useClasses = makeStyles({
  root: {
    overflowY: 'scroll',
    flex: 'auto',
    padding: `${tokens.spacingHorizontalS} ${tokens.spacingHorizontalL}`,
  },
})

export const Content = (props: ContentProps) => {
  const classes = useClasses()

  return <main className={classes.root}>{props.children}</main>
}
