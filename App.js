import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import MainRoutes from './src/router/MainRouters'

export default function App() {
  return (
    <NavigationContainer>
      <MainRoutes />
    </NavigationContainer>
  )
}