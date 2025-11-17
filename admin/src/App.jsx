import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <AdminLogin /> : <Navigate to="/" replace />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/products"
          element={isAuthenticated ? <Products /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/products/add"
          element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/products/edit/:id"
          element={isAuthenticated ? <EditProduct /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  )
}

export default App

