import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'


function App() {

  const { login, logout, token, userId, ready } = useAuth()

  const isAuthenticated = !!token

  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, ready }}>
      <BrowserRouter>
        <div>
          { routes }
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  
  )
}

export default App
