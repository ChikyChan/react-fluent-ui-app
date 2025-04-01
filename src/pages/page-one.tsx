import { useEffect } from 'react'
import { Text } from '@fluentui/react-components'

export const PageOne = () => {
  useEffect(() => {
    fetch('/api/user/me')
      .then((response) => response.json())
      .then((data) => alert(JSON.stringify(data, null, 2)))
  }, [])
  return <Text>Page One</Text>
}
