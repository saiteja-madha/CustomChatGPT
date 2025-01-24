import { defaultAPIEndpoint } from '@constants/auth';
import { StoreSlice } from './store';

export interface User {
  id: string;
  email: string;
  apiKey?: string;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface AuthSlice {
  isAuthenticated: boolean;
  user: User | null;
  apiEndpoint: string;
  firstVisit: boolean;
  setApiKey: (apiKey: string) => void;
  setUser: (user: User | null) => void;
  setApiEndpoint: (apiEndpoint: string) => void;
  setFirstVisit: (firstVisit: boolean) => void;
  login: (email: string, apiKey: string) => void;
  logout: () => void;
}

export const createAuthSlice: StoreSlice<AuthSlice> = (set, get) => ({
  isAuthenticated: false,
  user: null,
  apiEndpoint: defaultAPIEndpoint,
  firstVisit: true,

  setApiKey: (apiKey: string) => {
    set((prev: AuthSlice) => ({
      ...prev,
      user: prev.user ? { ...prev.user, apiKey } : null,
    }));
  },

  setUser: (user: User | null) => {
    set((prev: AuthSlice) => ({
      ...prev,
      user,
      isAuthenticated: !!user
    }));
  },

  login: (email: string, apiKey: string) => {
    const user: User = {
      id: crypto.randomUUID(),
      email,
      apiKey,
      createdAt: new Date(),
      lastLoginAt: new Date()
    };
    set((prev: AuthSlice) => ({
      ...prev,
      user,
      isAuthenticated: true
    }));
  },

  logout: () => {
    set((prev: AuthSlice) => ({
      ...prev,
      user: null,
      isAuthenticated: false
    }));
  },

  setApiEndpoint: (apiEndpoint: string) => {
    set((prev: AuthSlice) => ({
      ...prev,
      apiEndpoint: apiEndpoint,
    }));
  },

  setFirstVisit: (firstVisit: boolean) => {
    set((prev: AuthSlice) => ({
      ...prev,
      firstVisit: firstVisit,
    }));
  },
});
