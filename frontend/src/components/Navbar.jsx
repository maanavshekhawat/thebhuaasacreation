import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import logo from '../images/logo.jpg'

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity)
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-black text-white text-xs py-2.5">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <span className="font-medium">Free Shipping on orders above ₹999</span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">Easy Returns & Exchanges</span>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              {isAuthenticated ? (
                <>
                  <span>Welcome, {user?.name || 'User'}</span>
                  <span>|</span>
                  <button
                    onClick={handleLogout}
                    className="hover:underline"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:underline">Login</Link>
                  <span>|</span>
                  <Link to="/signup" className="hover:underline">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-3 flex-shrink-0 hover:opacity-90 transition-all group">
              <img 
                src={logo} 
                alt="The Buhaasa Creation" 
                className="object-contain"
                style={{ width: '4rem', height: '5rem', maxWidth: '4rem', maxHeight: '5rem' }}
              />
              <div className="flex flex-col">
                <div className="relative">
                  <span className="text-2xl font-black leading-tight tracking-tight" style={{ fontFamily: 'Arial, sans-serif', color: '#1a1a2e', letterSpacing: '1px', textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    THE BUHAASA
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#1a1a2e] via-[#4a5568] to-transparent opacity-30 group-hover:opacity-50 transition-opacity"></div>
                </div>
                <span className="text-xs font-medium tracking-[0.3em] uppercase mt-0.5" style={{ color: '#9ca3af', letterSpacing: '0.3em' }}>
                  CREATION
                </span>
              </div>
            </Link>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 focus:outline-none focus:border-black text-sm"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link
                to="/products?category=Men"
                className="text-black hover:text-gray-600 font-semibold text-sm transition-colors"
              >
                MEN
              </Link>
              <Link
                to="/products?category=Women"
                className="text-black hover:text-gray-600 font-semibold text-sm transition-colors"
              >
                WOMEN
              </Link>
              <Link
                to="/products?category=Kids"
                className="text-black hover:text-gray-600 font-semibold text-sm transition-colors"
              >
                KIDS
              </Link>
              <Link
                to="/cart"
                className="relative text-black hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

