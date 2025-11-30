// src/components/AuthGuard.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
const CustomerGuard = () => {

  const { role } = useAuth();
  if (role !== 'customer' ) {
    return <Navigate to={role === 'customer' ? '/dashboard/customer' : '/'} replace />;
  }

  return <Outlet />;
};

export default CustomerGuard;
