import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "NEW ARRIVALS",
      subtitle: "Latest Fashion Trends",
      description: "Discover the newest collection",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=800&fit=crop",
      buttonText: "SHOP NOW",
      link: "/products"
    },
    {
      id: 2,
      title: "SUMMER SALE",
      subtitle: "Up to 50% Off",
      description: "Get the best deals on summer essentials",
      image: "https://images.unsplash.com/photo-1469334031218-e382a7b7a2f9?w=1920&h=800&fit=crop",
      buttonText: "EXPLORE SALE",
      link: "/products"
    },
    {
      id: 3,
      title: "PREMIUM COLLECTION",
      subtitle: "Style Meets Comfort",
      description: "Experience luxury in every piece",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=800&fit=crop",
      buttonText: "VIEW COLLECTION",
      link: "/products"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Dark Overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          <div className="relative h-full flex items-center justify-center z-10">
            <div className="text-center text-white px-4">
              <p className="text-xs md:text-sm mb-3 font-semibold tracking-[0.2em] uppercase text-white drop-shadow-lg">
                {slide.subtitle}
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight text-white drop-shadow-2xl">
                {slide.title}
              </h2>
              <p className="text-sm md:text-base mb-8 font-medium max-w-md mx-auto text-white drop-shadow-lg">
                {slide.description}
              </p>
              <Link
                to={slide.link}
                className="inline-block bg-white text-black px-10 py-3 font-bold hover:bg-gray-100 transition-colors text-xs uppercase tracking-wider shadow-lg"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2.5 transition-all z-10"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2.5 transition-all z-10"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 transition-all ${
              index === currentSlide
                ? 'bg-white w-6'
                : 'bg-white/50 w-1 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel

