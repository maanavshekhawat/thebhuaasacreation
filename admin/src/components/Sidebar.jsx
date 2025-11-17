import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6 flex flex-col items-center">
        <div className="flex flex-col items-center mb-2">
          <div className="relative">
            <span className="text-2xl font-black leading-tight tracking-tight text-white" style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '1px', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
              THE BUHAASA
            </span>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"></div>
          </div>
          <span className="text-xs font-medium tracking-[0.3em] uppercase mt-0.5" style={{ color: '#cbd5e0', letterSpacing: '0.3em' }}>
            CREATION
          </span>
        </div>
        <p className="text-gray-400 text-xs mt-1 text-center">Admin Panel</p>
      </div>

      <nav className="mt-8">
        <Link
          to="/"
          className={`flex items-center px-6 py-3 transition-colors ${
            isActive('/') ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </Link>

        <Link
          to="/products"
          className={`flex items-center px-6 py-3 transition-colors ${
            isActive('/products') ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          Products
        </Link>
      </nav>

      <div className="absolute bottom-0 w-64 p-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white hover:bg-red-700 transition-colors rounded-lg font-semibold"
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar

