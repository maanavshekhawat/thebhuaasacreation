import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../store/slices/productSlice'
import ProductFilters from '../components/ProductFilters'

const Products = () => {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector((state) => state.products)
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const searchQuery = searchParams.get('search')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filters, setFilters] = useState({ priceRanges: [] })
  const [sortBy, setSortBy] = useState('relevance')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const priceRanges = [
    { min: 0, max: 500 },
    { min: 500, max: 1000 },
    { min: 1000, max: 2000 },
    { min: 2000, max: 5000 },
    { min: 5000, max: Infinity }
  ]

  useEffect(() => {
    let filtered = items

    // Apply category filter
    if (category) {
      filtered = filtered.filter((product) => product.category?.toLowerCase() === category.toLowerCase())
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter((product) => 
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      )
    }

    // Apply price filters
    if (filters.priceRanges && filters.priceRanges.length > 0) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price)
        return filters.priceRanges.some(rangeIndex => {
          const range = priceRanges[rangeIndex]
          return price >= range.min && price <= range.max
        })
      })
    }

    // Apply sorting
    if (sortBy === 'price_low') {
      filtered = [...filtered].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    } else if (sortBy === 'price_high') {
      filtered = [...filtered].sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    } else if (sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => b.id - a.id)
    }

    setFilteredProducts(filtered)
  }, [items, category, searchQuery, filters, sortBy])

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null
    if (imageUrl.startsWith('http')) return imageUrl
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'
    return `${backendUrl.replace('/api', '')}${imageUrl}`
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="mb-4 text-xs text-gray-600">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{searchQuery ? `Search: ${searchQuery}` : category || 'All Products'}</span>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black mb-1 uppercase tracking-wide">
            {searchQuery ? `Search Results for "${searchQuery}"` : category || 'All Products'}
          </h1>
          <p className="text-gray-600 text-sm">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-0 mb-6 border-b-2 border-gray-200">
          <Link
            to="/products"
            className={`px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-colors border-b-2 -mb-0.5 ${
              !category
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            All
          </Link>
          <Link
            to="/products?category=Men"
            className={`px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-colors border-b-2 -mb-0.5 ${
              category === 'Men'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Men
          </Link>
          <Link
            to="/products?category=Women"
            className={`px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-colors border-b-2 -mb-0.5 ${
              category === 'Women'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Women
          </Link>
          <Link
            to="/products?category=Kids"
            className={`px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-colors border-b-2 -mb-0.5 ${
              category === 'Kids'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Kids
          </Link>
        </div>

        {/* Filters and Products Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <ProductFilters
            filters={filters}
            onFilterChange={setFilters}
            onSortChange={setSortBy}
            sortBy={sortBy}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
          />

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-400 text-sm">
                {category 
                  ? `No products available in ${category} category.`
                  : 'No products available at the moment.'}
              </p>
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products

