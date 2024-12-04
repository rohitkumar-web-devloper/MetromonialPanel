
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { root } from '@/routes'
import { CssBaseline } from '@mui/material'
import AppTheme from './layout/AppTheme'

function App() {

  return (
    <>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <RouterProvider router={createBrowserRouter(root)} />
      </AppTheme>
    </>
  )
}

export default App
