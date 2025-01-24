import React from 'react';
import useStore from '@store/store';
import LoginForm from './LoginForm';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <>{children}</>;
};

export default AuthGuard;