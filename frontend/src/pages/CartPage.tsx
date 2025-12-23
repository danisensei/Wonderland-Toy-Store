import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useCartStore } from '../context/cartStore';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    if (items.length > 0) {
      setOrderPlaced(true);
      // Here you would typically call an API to create the order
      setTimeout(() => {
        clearCart();
        setOrderPlaced(false);
        setShowCheckout(false);
      }, 2000);
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
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
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
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="card flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-light rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Category: {item.category}
                    </p>
                    <p className="text-primary font-semibold">
                      PKR {item.price.toLocaleString('en-PK', { maximumFractionDigits: 0 })} each
                    </p>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-light transition"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
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

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-8">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

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
                    onClick={() => setShowCheckout(true)}
                    className="w-full btn btn-primary py-3 text-lg"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      placeholder="Delivery Address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={handleCheckout}
                      className="w-full btn btn-primary py-3 text-lg"
                    >
                      Place Order
                    </button>
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="w-full btn btn-outline"
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

