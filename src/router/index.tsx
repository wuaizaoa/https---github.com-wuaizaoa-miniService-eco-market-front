import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ProductList from '../pages/Product/ProductList';
import ProductDetail from '../pages/Product/ProductDetail';
import Login from '../pages/User/Login';
import Register from '../pages/User/Register';
import UserCenter from '../pages/User/UserCenter';
import CartPage from '../pages/Cart/CartPage';
import Checkout from '../pages/Order/Checkout';
import OrderList from '../pages/Order/OrderList';
import OrderDetail from '../pages/Order/OrderDetail';
import NotFound from '../pages/NotFound';
import { ProtectedRoute } from '../hooks/useAuth';
import { AdminProtectedRoute } from '../hooks/useAdminAuth';
import AdminLogin from '../pages/Admin/Login';
import AdminLayout from '../pages/Admin/Layout';
import UserManagement from '../pages/Admin/UserManagement';
import ProductManagement from '../pages/Admin/ProductManagement';
import OrderManagement from '../pages/Admin/OrderManagement';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <ProductList />,
      },
      {
        path: 'products/:id',
        element: <ProductDetail />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user',
        element: (
          <ProtectedRoute>
            <UserCenter />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/orders',
        element: (
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/orders/:id',
        element: (
          <ProtectedRoute>
            <OrderDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminLogin />,
      },
      {
        path: 'login',
        element: <AdminLogin />,
      },
      {
        path: 'users',
        element: (
          <AdminProtectedRoute>
            <UserManagement />
          </AdminProtectedRoute>
        ),
      },
      {
        path: 'products',
        element: (
          <AdminProtectedRoute>
            <ProductManagement />
          </AdminProtectedRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <AdminProtectedRoute>
            <OrderManagement />
          </AdminProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
