import { useAdminStore } from '@/stores/useAdminStore';
import { Navigate, useLocation } from 'react-router-dom';

const useAdminAuth = () =&gt; {
  const isLoggedIn = useAdminStore((state) =&gt; state.isLoggedIn);
  return { isLoggedIn };
};

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const AdminProtectedRoute: React.FC&lt;AdminProtectedRouteProps&gt; = ({ children }) =&gt; {
  const { isLoggedIn } = useAdminAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return &lt;Navigate to="/admin/login" state={{ from: location }} replace /&gt;;
  }

  return &lt;&gt;{children}&lt;/&gt;;
};

export default useAdminAuth;
