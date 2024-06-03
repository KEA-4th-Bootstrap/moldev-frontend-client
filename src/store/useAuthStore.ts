import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getAccessToken } from '../api/manageLocalStorage';

interface AuthStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      login: () => {
        const userLocalStorage = getAccessToken();
        if (userLocalStorage) {
          set({ isLoggedIn: true });
        }
      },
      logout: () => {
        set({ isLoggedIn: false });
        localStorage.clear();
      },
    }),
    {
      name: 'userLoginStatus',
    },
  ),
);

export default useAuthStore;
