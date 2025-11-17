import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import axios from 'axios'

const AddProduct = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    imageUrl: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageError, setImageError] = useState('')
  const [imageLoading, setImageLoading] = useState(false)
  const [uploadMethod, setUploadMethod] = useState('file') // 'url' or 'file'
  const [uploadingFile, setUploadingFile] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null
    if (imageUrl.startsWith('http')) return imageUrl
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'
    return `${backendUrl.replace('/api', '')}${imageUrl}`
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (e.target.name === 'imageUrl') {
      validateImageUrl(e.target.value)
    }
  }

  const validateImageUrl = async (url) => {
    if (!url) {
      setImageError('')
      return
    }

    // If it's a relative URL (starts with /), it's from our upload, skip validation
    if (url.startsWith('/')) {
      setImageError('')
      return
    }

    // Basic URL format validation for external URLs
    try {
      new URL(url)
    } catch {
      setImageError('Invalid URL format')
      return
    }

    // Check if URL is an image
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    const isImageUrl = imageExtensions.some(ext => 
      url.toLowerCase().includes(ext)
    )

    if (!isImageUrl && !url.includes('http')) {
      setImageError('Please enter a valid image URL')
      return
    }

    // Try to load the image to verify it exists
    setImageLoading(true)
    setImageError('')
    
    const img = new Image()
    img.onload = () => {
      setImageLoading(false)
      setImageError('')
    }
    img.onerror = () => {
      setImageLoading(false)
      setImageError('Image not found or cannot be loaded. Please check the URL.')
    }
    img.src = url
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setImageError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError('File size must be less than 5MB')
      return
    }

    setSelectedFile(file)
    setImageError('')
    setUploadingFile(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const API_URL = import.meta.env.VITE_API_URL || '/api'
      const response = await axios.post(`${API_URL}/upload/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setFormData(prev => ({
        ...prev,
        imageUrl: response.data.url
      }))
      setImageError('')
    } catch (err) {
      setImageError(err.response?.data?.error || 'Failed to upload image')
    } finally {
      setUploadingFile(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate image before submitting
    if (!formData.imageUrl) {
      setError('Please provide an image (upload file or enter URL)')
      return
    }

    // Only validate external URLs, not uploaded files
    if (uploadMethod === 'url' && formData.imageUrl && formData.imageUrl.startsWith('http')) {
      await validateImageUrl(formData.imageUrl)
      if (imageError) {
        setError('Please fix the image URL error before submitting')
        return
      }
    }

    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('adminToken')
      const API_URL = import.meta.env.VITE_API_URL || '/api'
      await axios.post(
        `${API_URL}/admin/products`,
        {
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      navigate('/products')
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          Add Product
        </h1>

        <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <input
                type="text"
                name="category"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Men, Women, Kids"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Image *
              </label>
              
              {/* Toggle between URL and File Upload */}
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setUploadMethod('file')
                    setFormData(prev => ({ ...prev, imageUrl: '' }))
                    setImageError('')
                    setSelectedFile(null)
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    uploadMethod === 'file'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUploadMethod('url')
                    setFormData(prev => ({ ...prev, imageUrl: '' }))
                    setImageError('')
                    setSelectedFile(null)
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    uploadMethod === 'url'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Enter URL
                </button>
              </div>

              {uploadMethod === 'file' ? (
                <>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      disabled={uploadingFile}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      {uploadingFile ? (
                        <div className="text-blue-600">
                          <p className="text-sm font-medium">Uploading...</p>
                        </div>
                      ) : selectedFile ? (
                        <div className="text-green-600">
                          <p className="text-sm font-medium">✓ {selectedFile.name}</p>
                          <p className="text-xs text-gray-500 mt-1">Click to change</p>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="w-12 h-12 text-gray-400 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="text-sm font-medium text-gray-700">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="url"
                    name="imageUrl"
                    required={uploadMethod === 'url'}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      imageError ? 'border-red-300' : 'border-gray-200'
                    }`}
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  {imageLoading && (
                    <p className="mt-1 text-xs text-blue-600">Checking image...</p>
                  )}
                </>
              )}

              {imageError && (
                <p className="mt-2 text-xs text-red-600">{imageError}</p>
              )}

              {formData.imageUrl && !imageError && !imageLoading && !uploadingFile && (
                <div className="mt-4">
                  <p className="text-xs text-gray-600 mb-2">Image Preview:</p>
                  <div className="border-2 border-gray-200 rounded-lg p-2 bg-gray-50">
                    <img
                      src={getImageUrl(formData.imageUrl) || ''}
                      alt="Preview"
                      className="max-w-full h-48 object-contain mx-auto rounded"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        if (!imageError) {
                          setImageError('Image failed to load')
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || imageError || imageLoading || uploadingFile}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Adding...' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct

