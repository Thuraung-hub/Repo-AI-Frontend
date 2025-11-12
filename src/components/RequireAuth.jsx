import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStatus } from '../libs/hooks/auth/queries';
// ENDPOINTS no longer needed directly here; using centralized auth queries

// Protects routes by verifying the current session from /route/user.
// If unauthenticated (401 handled globally) or user missing, redirects to /login.
export default function RequireAuth({ children }) {
  const location = useLocation();
  // Query current user/session profile
  // Query current user/session profile via centralized auth hook
  const { data, isLoading, isError, error } = useAuthStatus();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-[#121212]">
        <p>Checking authentication…</p>
      </div>
    );
  }

  // Unauthenticated conditions:
  // 1. Explicit 401 error from API layer
  // 2. No user object / missing identifying field (e.g., username)
  if (data.authenticated != true) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
