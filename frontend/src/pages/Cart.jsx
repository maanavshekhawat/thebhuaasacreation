import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    } else {
      dispatch(removeFromCart(id))
    }
  }

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('Your cart is empty!')
      return
    }

    setLoading(true)
    
    // Dummy/Mock Payment Implementation
    // Simulate payment processing
    setTimeout(() => {
      // Show confirmation dialog
      const confirmed = window.confirm(
        `Proceed with payment of ₹${totalAmount.toFixed(2)}?\n\n` +
        `This is a dummy payment for testing.\n` +
        `In production, this will open Razorpay payment gateway.`
      )
      
      if (confirmed) {
        // Simulate payment processing delay
        setTimeout(() => {
          // Simulate successful payment
          const paymentSuccess = Math.random() > 0.1 // 90% success rate for demo
          
          if (paymentSuccess) {
            // Clear cart and show success
            dispatch(clearCart())
            alert(`✅ Payment Successful!\n\nOrder Total: ₹${totalAmount.toFixed(2)}\n\nYour order has been placed successfully.`)
            navigate('/products')
          } else {
            // Simulate payment failure (10% chance)
            alert('❌ Payment Failed\n\nPlease try again or contact support.')
          }
          setLoading(false)
        }, 1500) // 1.5 second delay to simulate processing
      } else {
        setLoading(false)
      }
    }, 300)
    
    /* 
    // REAL RAZORPAY INTEGRATION (Uncomment when you have Razorpay keys configured)
    try {
      // Create order in backend
      const orderItems = items.map(item => ({
        productId: item.id,
        productName: item.name,
        price: parseFloat(item.price),
        quantity: item.quantity
      }))

      // Get user ID from auth state
      const userId = user?.id || (user && typeof user === 'object' ? user.id : null) || 1
      
      const response = await axios.post(`${API_URL}/payment/create-order`, {
        userId: userId,
        amount: totalAmount,
        items: orderItems
      })

      const { orderId, amount, currency, keyId } = response.data

      // Initialize Razorpay checkout
      const options = {
        key: keyId,
        amount: Math.round(parseFloat(amount) * 100), // Convert to paise
        currency: currency,
        name: 'The Bhuaasa Creation',
        description: 'Order Payment',
        order_id: orderId,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axios.post(`${API_URL}/payment/verify`, {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            })

            if (verifyResponse.data.message === 'Payment verified successfully') {
              dispatch(clearCart())
              alert('Payment successful! Your order has been placed.')
              navigate('/products')
            } else {
              alert('Payment verification failed. Please contact support.')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            alert('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: ''
        },
        theme: {
          color: '#000000'
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', function (response) {
        alert('Payment failed: ' + response.error.description)
        setLoading(false)
      })
      razorpay.open()
    } catch (error) {
      console.error('Checkout error:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to initiate payment. Please try again.'
      alert(`Error: ${errorMessage}`)
      setLoading(false)
    }
    */
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="text-blue-600 hover:underline font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 mb-4 last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center relative">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          const noImageDiv = e.target.parentElement.querySelector('.no-image-placeholder')
                          if (noImageDiv) {
                            noImageDiv.style.display = 'flex'
                          }
                        }}
                      />
                    ) : null}
                    <div className={`text-xs text-gray-400 font-medium no-image-placeholder ${item.imageUrl ? 'hidden' : 'flex'}`}>
                      No Image
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold w-20 text-right">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Items ({totalQuantity})</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={loading || items.length === 0}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            <Link
              to="/products"
              className="block text-center mt-4 text-black hover:text-gray-600 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

