// src/components/AuthGuard.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
const GuestGuard = () => {

  const { role } = useAuth();
  if (role !== 'guest' ) {
    return <Navigate to={role === 'customer' ? '/dashboard/customer' : '/'} replace />;
  }

  return <Outlet />;
};

export default GuestGuard;
