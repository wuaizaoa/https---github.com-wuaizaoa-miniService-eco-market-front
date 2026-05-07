import { useUserStore } from '@/stores/useUserStore';
import { Navigate, useLocation } from 'react-router-dom';

export const useAuth = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  return { isLoggedIn };
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
