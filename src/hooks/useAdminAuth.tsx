import { useAdminStore } from '@/stores/useAdminStore';
import { Navigate, useLocation } from 'react-router-dom';

const useAdminAuth = () => {
  const isLoggedIn = useAdminStore((state) => state.isLoggedIn);
  const adminToken = useAdminStore((state) => state.adminToken);
  return { isLoggedIn, adminToken };
};

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAdminAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default useAdminAuth;
