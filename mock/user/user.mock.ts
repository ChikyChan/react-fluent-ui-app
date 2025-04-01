import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock({
  url: '/api/user/me',
  body: {
    name: 'Chiky Chan',
    displayName: 'Chiky Chan',
    age: 31,
  },
})
