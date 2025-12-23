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
    setError(null);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Validate checkout data
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
      // Create order via API
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
      clearCart();

      setTimeout(() => {
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
          <div className="card text-center py-16 max-w-md mx-auto">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">Your order has been confirmed and will be processed soon.</p>
            <p className="text-sm text-gray-500">Redirecting to orders page...</p>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="card flex gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.brand}</p>
                      <p className="text-primary font-bold mt-2">PKR {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-end gap-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="btn btn-outline text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <div className="card sticky top-4">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>PKR {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>PKR 500</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">PKR {(totalPrice + 500).toLocaleString()}</span>
                </div>
              </div>

              {items.length > 0 && (
                <button
                  onClick={() => setShowCheckout(!showCheckout)}
                  className="w-full btn btn-primary mb-3"
                >
                  Proceed to Checkout
                </button>
              )}

              <Link to="/products" className="w-full btn btn-outline text-center">
                <FaArrowLeft className="inline mr-2" />
                Continue Shopping
              </Link>
            </div>

            {/* Checkout Form */}
            {showCheckout && items.length > 0 && (
              <div className="card mt-4">
                <h3 className="font-bold mb-4">Delivery Information</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={checkoutData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={checkoutData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="deliveryAddress"
                    placeholder="Delivery Address"
                    value={checkoutData.deliveryAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={checkoutData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={checkoutData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                  <button
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="w-full btn btn-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="inline animate-spin mr-2" />
                        Placing Order...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

