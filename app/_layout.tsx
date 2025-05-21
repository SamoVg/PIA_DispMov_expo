import { Stack } from 'expo-router'
import React from 'react'

const rootLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
      name='(tabs)'
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen name="+not-found" options={{}}></Stack.Screen>
    </Stack>
  )
}

export default rootLayout