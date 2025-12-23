import React, { useState } from 'react';
import { FaBox, FaClock, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { useAuthStore } from '../context/authStore';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

const OrdersPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-001',
      items: [
        { id: '1', name: 'Robot Explorer', quantity: 1, price: 49.99 },
        { id: '2', name: 'Soft Teddy Bear', quantity: 2, price: 24.99 },
      ],
      totalAmount: 99.97,
      status: 'delivered',
      createdAt: '2025-12-15',
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      items: [
        { id: '3', name: 'Chess Master', quantity: 1, price: 34.99 },
      ],
      totalAmount: 38.49,
      status: 'shipped',
      createdAt: '2025-12-20',
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'processing':
        return <FaBox className="text-blue-500" />;
      case 'shipped':
        return <FaTruck className="text-orange-500" />;
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-orange-100 text-orange-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-light py-12">
        <div className="container mx-auto px-4">
          <div className="card text-center py-16 max-w-md mx-auto">
            <p className="text-4xl mb-4">🔐</p>
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please login to view your orders.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="card text-center py-16 max-w-md mx-auto">
            <p className="text-4xl mb-4">📦</p>
            <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
            <p className="text-gray-600">
              You haven't placed any orders yet. Start shopping!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="card">
                {/* Order Header */}
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

                {/* Order Items */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-3">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span className="font-semibold">
                            {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Total */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <span className="font-bold">Total:</span>
                  <span className="text-xl font-bold text-primary">
                    ${order.totalAmount.toFixed(2)}
                  </span>
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

