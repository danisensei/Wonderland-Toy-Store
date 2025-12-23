import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaClock, FaTruck, FaCheckCircle, FaTimesCircle, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { useAuthStore } from '../context/authStore';
import { orderService, Order } from '../services/orderService';

const OrdersPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

<<<<<<< Updated upstream
=======
  // Fetch orders from API
>>>>>>> Stashed changes
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await orderService.getUserOrders();
        setOrders(data);
      } catch (err: any) {
        console.error('Failed to fetch orders:', err);
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    setCancellingOrderId(orderId);
    try {
      const updatedOrder = await orderService.cancelOrder(orderId);
      setOrders(orders.map(o => o.id === orderId ? updatedOrder : o));
    } catch (err: any) {
      alert(err.message || 'Failed to cancel order');
    } finally {
      setCancellingOrderId(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
<<<<<<< Updated upstream
      case 'pending': return <FaClock className="text-yellow-500" />;
      case 'processing': return <FaBox className="text-blue-500" />;
      case 'shipped': return <FaTruck className="text-orange-500" />;
      case 'delivered': return <FaCheckCircle className="text-green-500" />;
      case 'cancelled': return <FaTimesCircle className="text-red-500" />;
      default: return null;
=======
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'processing':
        return <FaBox className="text-blue-500" />;
      case 'shipped':
        return <FaTruck className="text-orange-500" />;
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return null;
>>>>>>> Stashed changes
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
<<<<<<< Updated upstream
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-orange-100 text-orange-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
=======
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-orange-100 text-orange-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
>>>>>>> Stashed changes
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-light py-12">
        <div className="container mx-auto px-4">
          <div className="card text-center py-16 max-w-md mx-auto">
            <p className="text-4xl mb-4">🔐</p>
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
<<<<<<< Updated upstream
            <p className="text-gray-600 mb-6">Please login to view your orders.</p>
            <Link to="/login" className="btn btn-primary">Login</Link>
=======
            <p className="text-gray-600 mb-6">
              Please login to view your orders.
            </p>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

<<<<<<< Updated upstream
        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-3 text-red-700">
              <FaExclamationTriangle className="text-2xl flex-shrink-0" />
=======
        {/* Error State */}
        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-3 text-red-700">
              <FaExclamationTriangle className="text-2xl" />
>>>>>>> Stashed changes
              <div>
                <h3 className="font-bold">Error Loading Orders</h3>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

<<<<<<< Updated upstream
=======
        {/* Loading State */}
>>>>>>> Stashed changes
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <FaSpinner className="text-4xl text-primary animate-spin mb-4" />
            <p className="text-gray-600">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="card text-center py-16 max-w-md mx-auto">
            <p className="text-4xl mb-4">📦</p>
            <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
<<<<<<< Updated upstream
            <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping!</p>
            <Link to="/products" className="btn btn-primary">Shop Now</Link>
=======
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping!
            </p>
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
>>>>>>> Stashed changes
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="card">
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-bold">{order.orderNumber}</h3>
                    <p className="text-gray-600 text-sm">
                      Ordered on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize font-semibold">{order.status}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-3">Items:</h4>
                  <div className="space-y-2">
<<<<<<< Updated upstream
                    {order.items.map((item, index) => (
                      <div key={item.id || index} className="flex justify-between text-sm">
=======
                    {order.items.map((item) => (
                      <div key={item.id || item.productId} className="flex justify-between text-sm">
>>>>>>> Stashed changes
                        <span>{item.name || `Product #${item.productId}`} x {item.quantity}</span>
                        <span className="font-semibold">
                          PKR {(item.price * item.quantity).toLocaleString('en-PK', { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

<<<<<<< Updated upstream
=======
                {/* Delivery Address */}
>>>>>>> Stashed changes
                {order.deliveryAddress && (
                  <div className="mb-4 text-sm text-gray-600">
                    <span className="font-semibold">Delivery: </span>
                    {order.deliveryAddress}
                    {order.city && `, ${order.city}`}
                    {order.postalCode && ` ${order.postalCode}`}
                  </div>
                )}

<<<<<<< Updated upstream
=======
                {/* Order Total & Actions */}
>>>>>>> Stashed changes
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <span className="font-bold">Total: </span>
                    <span className="text-xl font-bold text-primary">
<<<<<<< Updated upstream
                      PKR {order.totalAmount.toLocaleString('en-PK', { maximumFractionDigits: 0 })}
                    </span>
                  </div>

=======
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>

                  {/* Cancel button for pending/processing orders */}
>>>>>>> Stashed changes
                  {(order.status === 'pending' || order.status === 'processing') && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      disabled={cancellingOrderId === order.id}
<<<<<<< Updated upstream
                      className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 disabled:opacity-50 transition"
=======
                      className="btn btn-outline text-red-500 border-red-500 hover:bg-red-50 disabled:opacity-50"
>>>>>>> Stashed changes
                    >
                      {cancellingOrderId === order.id ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
<<<<<<< Updated upstream
                        <FaTimesCircle />
                      )}
                      Cancel Order
=======
                        'Cancel Order'
                      )}
>>>>>>> Stashed changes
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
