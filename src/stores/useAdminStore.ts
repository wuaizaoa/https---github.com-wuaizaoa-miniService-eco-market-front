import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminState {
  isLoggedIn: boolean;
  adminToken: string | null;
  adminUser: { username: string } | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      adminToken: null,
      adminUser: null,
      login: (token, username) => {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify({ username }));
        set({ isLoggedIn: true, adminToken: token, adminUser: { username } });
      },
      logout: () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        set({ isLoggedIn: false, adminToken: null, adminUser: null });
      },
    }),
    {
      name: 'admin-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          const token = localStorage.getItem('adminToken');
          const userStr = localStorage.getItem('adminUser');
          return {
            state: {
              ...state,
              adminToken: token,
              adminUser: userStr ? JSON.parse(userStr) : null,
              isLoggedIn: !!token && !!userStr,
            },
          };
        },
        setItem: (name, newValue) => {
          localStorage.setItem(name, JSON.stringify(newValue));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
