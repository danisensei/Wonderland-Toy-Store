import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { useCartStore } from '../context/cartStore';
import { useAuthStore } from '../context/authStore';
import { orderService } from '../services/orderService';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    email: '',
    deliveryAddress: '',
    city: '',
    postalCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckoutData(prev => ({ ...prev, [name]: value }));
<<<<<<< Updated upstream
    setError(null);
=======
>>>>>>> Stashed changes
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

<<<<<<< Updated upstream
=======
    // Validate checkout data
>>>>>>> Stashed changes
    if (!checkoutData.deliveryAddress || !checkoutData.city) {
      setError('Please fill in the delivery address and city');
      return;
    }

    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
<<<<<<< Updated upstream
=======
      // Create order via API
>>>>>>> Stashed changes
      await orderService.createOrder({
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        deliveryAddress: checkoutData.deliveryAddress,
        city: checkoutData.city,
        postalCode: checkoutData.postalCode,
      });

      setOrderPlaced(true);

<<<<<<< Updated upstream
=======
      // Clear cart and redirect after delay
>>>>>>> Stashed changes
      setTimeout(() => {
        clearCart();
        setOrderPlaced(false);
        setShowCheckout(false);
        navigate('/orders');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-light py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto card text-center py-12">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Order Placed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <p className="text-sm text-gray-500">Redirecting to orders page...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        <Link
          to="/products"
          className="flex items-center gap-2 text-primary font-semibold mb-8 hover:gap-3 transition"
        >
          <FaArrowLeft /> Continue Shopping
        </Link>

        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="card text-center py-16 max-w-md mx-auto">
            <p className="text-3xl mb-4">🛒</p>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Add some amazing toys to your cart and start shopping!
            </p>
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="card flex gap-4">
                  <div className="w-24 h-24 bg-light rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Category: {item.category}
                    </p>
                    <p className="text-primary font-semibold">
                      PKR {item.price.toLocaleString('en-PK', { maximumFractionDigits: 0 })} each
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-light transition"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-light transition"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-24">
                      <p className="text-xl font-bold text-primary">
                        PKR {(item.price * item.quantity).toLocaleString('en-PK', { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-gray-500">Subtotal</p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="card sticky top-8">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4 pb-4 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.reduce((t, i) => t + i.quantity, 0)} items)</span>
                    <span className="font-semibold">
                      PKR {getTotalPrice().toLocaleString('en-PK', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-500">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="font-semibold">
                      PKR {(getTotalPrice() * 0.1).toLocaleString('en-PK', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between py-4 text-2xl font-bold mb-6">
                  <span>Total</span>
                  <span className="text-primary">
                    PKR {(getTotalPrice() * 1.1).toLocaleString('en-PK', { maximumFractionDigits: 0 })}
                  </span>
                </div>

                {!showCheckout ? (
                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        navigate('/login');
                      } else {
                        setShowCheckout(true);
                      }
                    }}
                    className="w-full btn btn-primary py-3 text-lg"
                  >
                    {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                  </button>
                ) : (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="fullName"
                      value={checkoutData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      name="email"
                      value={checkoutData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      name="deliveryAddress"
                      value={checkoutData.deliveryAddress}
                      onChange={handleInputChange}
                      placeholder="Delivery Address *"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      value={checkoutData.city}
                      onChange={handleInputChange}
                      placeholder="City *"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      required
                    />
                    <input
                      type="text"
                      name="postalCode"
                      value={checkoutData.postalCode}
                      onChange={handleInputChange}
                      placeholder="Postal Code"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={handleCheckout}
                      disabled={isSubmitting}
                      className="w-full btn btn-primary py-3 text-lg disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Placing Order...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="w-full btn btn-outline"
                      disabled={isSubmitting}
                    >
                      Back
                    </button>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    ✓ Secure checkout • ✓ Free returns • ✓ 24/7 support
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
