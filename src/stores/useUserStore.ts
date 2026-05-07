import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface UserState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      login: (user, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, token, isLoggedIn: true });
      },
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, isLoggedIn: false });
      },
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'user-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          const token = localStorage.getItem('token');
          const userStr = localStorage.getItem('user');
          return {
            state: {
              ...state,
              token,
              user: userStr ? JSON.parse(userStr) : null,
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
