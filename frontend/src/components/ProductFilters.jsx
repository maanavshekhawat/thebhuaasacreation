import { useState } from 'react'

const ProductFilters = ({ 
  filters, 
  onFilterChange, 
  onSortChange, 
  sortBy,
  isOpen,
  onToggle 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    sort: true
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const priceRanges = [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
    { label: '₹2000 - ₹5000', min: 2000, max: 5000 },
    { label: 'Above ₹5000', min: 5000, max: Infinity }
  ]

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ]

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4 flex items-center justify-between">
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium text-black hover:bg-gray-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>Filters</span>
        </button>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 text-sm font-medium text-black bg-white"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Filter Sidebar */}
      <div className={`${isOpen ? 'fixed left-0 top-0 h-full z-50 overflow-y-auto' : 'hidden'} lg:block lg:relative lg:z-auto lg:h-auto lg:overflow-visible w-full lg:w-64 flex-shrink-0 bg-white`}>
        <div className="lg:border-r lg:border-gray-200 pr-0 lg:pr-6 p-4 lg:p-0">
          {/* Mobile Close Button */}
          <div className="lg:hidden flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-black uppercase">Filters</h2>
            <button
              onClick={onToggle}
              className="text-gray-600 hover:text-black"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Sort Section */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <button
              onClick={() => toggleSection('sort')}
              className="w-full flex items-center justify-between text-sm font-semibold text-black uppercase tracking-wide mb-3"
            >
              <span>Sort By</span>
              <svg 
                className={`w-4 h-4 transition-transform ${expandedSections.sort ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSections.sort && (
              <div className="space-y-2">
                {sortOptions.map(option => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={sortBy === option.value}
                      onChange={(e) => onSortChange(e.target.value)}
                      className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between text-sm font-semibold text-black uppercase tracking-wide mb-3"
            >
              <span>Price</span>
              <svg 
                className={`w-4 h-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSections.price && (
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <label key={index} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.priceRanges?.includes(index) || false}
                      onChange={(e) => {
                        const newRanges = filters.priceRanges || []
                        if (e.target.checked) {
                          onFilterChange({ ...filters, priceRanges: [...newRanges, index] })
                        } else {
                          onFilterChange({ ...filters, priceRanges: newRanges.filter(i => i !== index) })
                        }
                      }}
                      className="w-4 h-4 text-black border-gray-300 focus:ring-black rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Clear Filters Button */}
          {(filters.priceRanges?.length > 0) && (
            <button
              onClick={() => {
                onFilterChange({ priceRanges: [] })
                onSortChange('relevance')
              }}
              className="w-full text-sm text-black font-medium hover:underline uppercase tracking-wide"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductFilters

