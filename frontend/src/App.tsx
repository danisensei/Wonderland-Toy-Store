import React, { useEffect } from 'react';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './context/authStore';

// Layout
=======
=======
>>>>>>> Stashed changes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> Stashed changes
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
<<<<<<< Updated upstream
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

=======
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import FAQPage from './pages/FAQPage';
import { useAuthStore } from './context/authStore';

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  // Check authentication status on app load
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      checkAuth();
    }
  }, [checkAuth]);

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Admin routes - no header/footer */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Main routes with header/footer */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route
                      path="/orders"
                      element={
                        <ProtectedRoute>
                          <OrdersPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <ProfilePage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
