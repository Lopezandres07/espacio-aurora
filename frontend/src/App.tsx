import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './pages/public/Home'
import { Login } from './pages/public/Login'
import { Register } from './pages/public/Register'
import { UserDashboard } from './pages/private/UserDashboard'
import { AdminDashboard } from './pages/private/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/register'
            element={<Register />}
          />

          {/* Protected Dashboard Routes */}
          <Route
            path='/dashboard'
            element={<UserDashboard />}
          />
          <Route
            path='/admin'
            element={<AdminDashboard />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
