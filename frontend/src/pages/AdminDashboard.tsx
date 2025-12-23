import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBox,
  FaShoppingBag,
  FaUsers,
  FaChartBar,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaSignOutAlt,
  FaLock,
  FaExclamationTriangle,
  FaClock,
} from 'react-icons/fa';
import { useAuthStore } from '../context/authStore';
import { useProductStore } from '../context/productStore';
import { Product } from '../services/productService';

interface AdminOrder {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  deliveryAddress: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'users'>('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'Electronic' | 'Plush' | 'BoardGame'>('all');
  const [filterOrderStatus, setFilterOrderStatus] = useState<'all' | 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled'>('all');

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };


  const [orders, setOrders] = useState<AdminOrder[]>([
    {
      id: '1',
      orderNumber: 'ORD-20251223-00001',
      userId: 'user1',
      userName: 'Ali Khan',
      items: [
        { productId: '1', productName: 'Smart Robot', quantity: 1, price: 4999},
        { productId: '2', productName: 'Cuddly Teddy Bear', quantity: 2, price: 2499 },
      ],
      totalAmount: 9997,
      status: 'Pending',
      createdAt: '2025-12-23',
      deliveryAddress: '123 Main St, Karachi',
    },
    {
      id: '2',
      orderNumber: 'ORD-20251223-00002',
      userId: 'user2',
      userName: 'Fatima Ahmed',
      items: [{ productId: '3', productName: 'Chess Set', quantity: 1, price: 3499 }],
      totalAmount: 3499,
      status: 'Confirmed',
      createdAt: '2025-12-22',
      deliveryAddress: '456 Defense Rd, Lahore',
    },
  ]);

  const [users] = useState<AdminUser[]>([
    {
      id: '1',
      name: 'Ali Khan',
      email: 'ali@example.com',
      phone: '03001234567',
      address: '123 Main St, Karachi',
      totalOrders: 5,
      totalSpent: 25000,
      joinedDate: '2025-01-15',
    },
    {
      id: '2',
      name: 'Fatima Ahmed',
      email: 'fatima@example.com',
      phone: '03119876543',
      address: '456 Defense Rd, Lahore',
      totalOrders: 3,
      totalSpent: 15000,
      joinedDate: '2025-02-20',
    },
  ]);

  // Calculate dashboard stats
  const dashboardStats = {
    totalProducts: products.length,
    lowStockProducts: products.filter((p) => p.quantity < 10).length,
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === 'Pending').length,
    totalRevenue: orders
      .filter((o) => o.status === 'Delivered')
      .reduce((sum, o) => sum + o.totalAmount, 0),
    totalUsers: users.length,
  };

  // Handle product form
  const handleSaveProduct = (productData: any) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct({
        ...productData,
        id: Date.now().toString(),
      });
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: AdminOrder['status']) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterOrderStatus === 'all' || o.status === filterOrderStatus;
    return matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaChartBar className="text-4xl" />
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-blue-100">Wonderland Toy Store Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-blue-100">Logged in as:</p>
              <p className="font-semibold flex items-center gap-1">
                <FaLock className="text-yellow-300" /> {user?.name}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg transition font-semibold"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 flex gap-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-4 px-2 font-semibold border-b-4 transition ${
              activeTab === 'dashboard'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FaChartBar className="inline mr-2" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-4 px-2 font-semibold border-b-4 transition ${
              activeTab === 'products'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FaBox className="inline mr-2" /> Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-4 px-2 font-semibold border-b-4 transition ${
              activeTab === 'orders'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FaShoppingBag className="inline mr-2" /> Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-2 font-semibold border-b-4 transition ${
              activeTab === 'users'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FaUsers className="inline mr-2" /> Users ({users.length})
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Total Products */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Products</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {dashboardStats.totalProducts}
                    </p>
                  </div>
                  <FaBox className="text-5xl text-blue-500 opacity-20" />
                </div>
              </div>

              {/* Low Stock */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Low Stock Items</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {dashboardStats.lowStockProducts}
                    </p>
                  </div>
                  <FaExclamationTriangle className="text-5xl text-yellow-500 opacity-20" />
                </div>
              </div>

              {/* Total Orders */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <p className="text-3xl font-bold text-green-600">
                      {dashboardStats.totalOrders}
                    </p>
                  </div>
                  <FaShoppingBag className="text-5xl text-green-500 opacity-20" />
                </div>
              </div>

              {/* Pending Orders */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Pending Orders</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {dashboardStats.pendingOrders}
                    </p>
                  </div>
                  <FaClock className="text-5xl text-orange-500 opacity-20" />
                </div>
              </div>

              {/* Total Revenue */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold text-purple-600">
                      PKR {dashboardStats.totalRevenue.toLocaleString('en-PK')}
                    </p>
                  </div>
                  <FaChartBar className="text-5xl text-purple-500 opacity-20" />
                </div>
              </div>

              {/* Total Users */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Customers</p>
                    <p className="text-3xl font-bold text-pink-600">
                      {dashboardStats.totalUsers}
                    </p>
                  </div>
                  <FaUsers className="text-5xl text-pink-500 opacity-20" />
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-600 font-semibold">Order #</th>
                      <th className="px-4 py-3 text-left text-gray-600 font-semibold">Customer</th>
                      <th className="px-4 py-3 text-left text-gray-600 font-semibold">Total</th>
                      <th className="px-4 py-3 text-left text-gray-600 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-blue-600">{order.orderNumber}</td>
                        <td className="px-4 py-3">{order.userName}</td>
                        <td className="px-4 py-3 font-semibold">
                          PKR {order.totalAmount.toLocaleString('en-PK')}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : order.status === 'Confirmed'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'Shipped'
                                ? 'bg-purple-100 text-purple-800'
                                : order.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products View */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
              <button
                onClick={() => {
                  setShowProductForm(true);
                  setEditingProduct(null);
                }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                <FaPlus /> Add Product
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 flex gap-4 flex-wrap">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <FaFilter className="self-center text-gray-600" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Plush">Plush</option>
                  <option value="BoardGame">Board Game</option>
                </select>
              </div>
            </div>

            {/* Product Form Modal */}
            {showProductForm && (
              <ProductFormModal
                product={editingProduct}
                onSave={handleSaveProduct}
                onClose={() => {
                  setShowProductForm(false);
                  setEditingProduct(null);
                }}
              />
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  {/* Product Image */}
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.brand}</p>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">
                        PKR {product.price.toLocaleString('en-PK')}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.quantity > 10
                            ? 'bg-green-100 text-green-800'
                            : product.quantity > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        Stock: {product.quantity}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="text-xs font-semibold">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setShowProductForm(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded transition"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded transition"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found</p>
              </div>
            )}
          </div>
        )}

        {/* Orders View */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>

            {/* Filter */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex gap-2">
                <FaFilter className="self-center text-gray-600" />
                <select
                  value={filterOrderStatus}
                  onChange={(e) => setFilterOrderStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Order #
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Items
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-blue-600 font-semibold">
                          {order.orderNumber}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-800">{order.userName}</p>
                            <p className="text-xs text-gray-600">{order.createdAt}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {order.items.length} item(s)
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          PKR {order.totalAmount.toLocaleString('en-PK')}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleUpdateOrderStatus(order.id, e.target.value as any)
                            }
                            className={`px-3 py-1 rounded text-xs font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              order.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : order.status === 'Confirmed'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'Shipped'
                                ? 'bg-purple-100 text-purple-800'
                                : order.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              alert(`Order Details:\n\nCustomer: ${order.userName}\nAddress: ${order.deliveryAddress}\n\nItems:\n${order.items.map((i) => `- ${i.productName} x${i.quantity}`).join('\n')}\n\nTotal: PKR ${order.totalAmount.toLocaleString('en-PK')}`)
                            }
                            className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-sm transition"
                          >
                            <FaEye /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No orders found</p>
              </div>
            )}
          </div>
        )}

        {/* Users View */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Orders
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Total Spent
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-800">{user.name}</td>
                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-gray-600">{user.phone}</td>
                        <td className="px-6 py-4">
                          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {user.totalOrders}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          PKR {user.totalSpent.toLocaleString('en-PK')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.joinedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {users.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No customers found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Product Form Modal Component
const ProductFormModal: React.FC<{
  product: AdminProduct | null;
  onSave: (productData: any) => void;
  onClose: () => void;
}> = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = React.useState(
    product || {
      name: '',
      brand: '',
      price: 0,
      quantity: 0,
      category: 'Electronic' as const,
      description: '',
      image: '',
    }
  );
  const [imagePreview, setImagePreview] = React.useState<string>(product?.image || '');
  const [isUploadingImage, setIsUploadingImage] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) : value,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({
          ...formData,
          image: base64String,
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Image
            </label>
            <div className="flex flex-col gap-3">
              {/* Image Preview */}
              {imagePreview && (
                <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setFormData({ ...formData, image: '' });
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              )}
              {/* File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploadingImage}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500">
                {isUploadingImage ? 'Uploading...' : 'Supported: JPG, PNG, GIF, WebP (Max 5MB)'}
              </p>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter brand"
            />
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Price (PKR)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Electronic">Electronic</option>
              <option value="Plush">Plush</option>
              <option value="BoardGame">Board Game</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              rows={2}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              {product ? 'Update' : 'Add'} Product
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default AdminDashboard;

