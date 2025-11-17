import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? (
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          ) : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/products" 
          element={isAuthenticated ? (
            <>
              <Navbar />
              <Products />
              <Footer />
            </>
          ) : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/products/:id" 
          element={isAuthenticated ? (
            <>
              <Navbar />
              <ProductDetail />
              <Footer />
            </>
          ) : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/cart" 
          element={isAuthenticated ? (
            <>
              <Navbar />
              <Cart />
              <Footer />
            </>
          ) : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/signup" 
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" replace />} 
        />
      </Routes>
    </div>
  )
}

export default App

