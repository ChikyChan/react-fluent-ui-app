import { createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../../pages'
import { NavigationContextType } from './types'

export const NavigationContext = createContext<NavigationContextType>({
  items: [],
  routes: (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  ),
})
