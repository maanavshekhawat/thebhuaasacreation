import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/slices/productSlice'
import Carousel from '../components/Carousel'

const Home = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Get products by category
  const menProducts = items.filter(p => p.category?.toLowerCase() === 'men').slice(0, 4)
  const womenProducts = items.filter(p => p.category?.toLowerCase() === 'women').slice(0, 4)
  const kidsProducts = items.filter(p => p.category?.toLowerCase() === 'kids').slice(0, 4)

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null
    if (imageUrl.startsWith('http')) return imageUrl
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'
    return `${backendUrl.replace('/api', '')}${imageUrl}`
  }

  const CategorySection = ({ title, products, category, bannerImage }) => (
    <div className="mb-16">
      {/* Category Banner */}
      {bannerImage && (
        <Link to={`/products?category=${category}`} className="block mb-8 group">
          <div className="relative h-48 md:h-64 overflow-hidden">
            <img
              src={bannerImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
                {title}
              </h2>
            </div>
          </div>
        </Link>
      )}
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black uppercase tracking-wide">
          {title}
        </h2>
        <Link
          to={`/products?category=${category}`}
          className="text-black hover:text-gray-600 font-semibold text-sm uppercase tracking-wide border-b-2 border-black hover:border-gray-600 transition-colors"
        >
          View All
        </Link>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group"
            >
              <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden relative mb-2">
                {getImageUrl(product.imageUrl) ? (
                  <img
                    src={getImageUrl(product.imageUrl)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      const noImageDiv = e.target.parentElement.querySelector('.no-image-placeholder')
                      if (noImageDiv) {
                        noImageDiv.style.display = 'flex'
                      }
                    }}
                  />
                ) : null}
                <div className={`text-sm text-gray-400 font-medium no-image-placeholder ${getImageUrl(product.imageUrl) ? 'hidden' : 'flex'}`}>
                  No Image
                </div>
              </div>
              <div>
                <h3 className="font-medium text-xs text-black mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-black font-bold text-sm">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">No products available in this category yet.</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="bg-white">
      {/* Hero Carousel - Full Width */}
      <div className="w-full">
        <Carousel />
      </div>

      {/* Category Banners Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/products?category=Men" className="group relative h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=800&h=600&fit=crop"
              alt="Men"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white text-2xl font-bold uppercase tracking-wider">Men</span>
            </div>
          </Link>
          <Link to="/products?category=Women" className="group relative h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop"
              alt="Women"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white text-2xl font-bold uppercase tracking-wider">Women</span>
            </div>
          </Link>
          <Link to="/products?category=Kids" className="group relative h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop"
              alt="Kids"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white text-2xl font-bold uppercase tracking-wider">Kids</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Men's Collection */}
        <CategorySection
          title="Men's Collection"
          products={menProducts}
          category="Men"
          bannerImage="https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=1200&h=400&fit=crop"
        />

        {/* Women's Collection */}
        <CategorySection
          title="Women's Collection"
          products={womenProducts}
          category="Women"
          bannerImage="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop"
        />

        {/* Kids Collection */}
        <CategorySection
          title="Kids Collection"
          products={kidsProducts}
          category="Kids"
          bannerImage="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=400&fit=crop"
        />

        {/* Featured Products */}
        {items.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black uppercase tracking-wide">
                Featured Products
              </h2>
              <Link
                to="/products"
                className="text-black hover:text-gray-600 font-semibold text-sm uppercase tracking-wide border-b-2 border-black hover:border-gray-600 transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {items.slice(0, 10).map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group"
                >
                  <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden relative mb-2">
                    {getImageUrl(product.imageUrl) ? (
                      <img
                        src={getImageUrl(product.imageUrl)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    ) : null}
                    {(!getImageUrl(product.imageUrl) || product.imageUrl === null) && (
                      <div className="text-5xl text-gray-300">👕</div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-xs text-black mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-black font-bold text-sm">₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home

