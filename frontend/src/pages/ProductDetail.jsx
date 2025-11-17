import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById, clearSelectedProduct } from '../store/slices/productSlice'
import { addToCart } from '../store/slices/cartSlice'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selectedProduct, loading, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProductById(id))
    return () => {
      dispatch(clearSelectedProduct())
    }
  }, [id, dispatch])

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct))
      alert('Product added to cart!')
    }
  }

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null
    if (imageUrl.startsWith('http')) return imageUrl
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'
    return `${backendUrl.replace('/api', '')}${imageUrl}`
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading product details...</div>
      </div>
    )
  }

  if (error || !selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-600">
          {error || 'Product not found'}
        </div>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/products')}
          className="mb-8 text-black hover:text-gray-600 font-medium text-sm uppercase tracking-wide transition-colors"
        >
          ← Back
        </button>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden relative">
            {getImageUrl(selectedProduct.imageUrl) ? (
              <img
                src={getImageUrl(selectedProduct.imageUrl)}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  const noImageDiv = e.target.parentElement.querySelector('.no-image-placeholder')
                  if (noImageDiv) {
                    noImageDiv.style.display = 'flex'
                  }
                }}
              />
            ) : null}
            <div className={`text-lg text-gray-400 font-medium no-image-placeholder ${getImageUrl(selectedProduct.imageUrl) ? 'hidden' : 'flex'}`}>
              No Image
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-light text-black mb-4 tracking-tight uppercase">
              {selectedProduct.name}
            </h1>
            <p className="text-3xl text-black font-light mb-6">
              ₹{selectedProduct.price}
            </p>
            <p className="text-gray-600 mb-8 font-light leading-relaxed">{selectedProduct.description}</p>
            <div className="mb-8 space-y-2">
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Category: <span className="text-black">{selectedProduct.category || 'N/A'}</span>
              </p>
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Stock: <span className="text-black">{selectedProduct.stock || 'N/A'}</span>
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 font-medium hover:bg-gray-800 transition-colors text-sm uppercase tracking-wider"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

