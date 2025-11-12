// src/libs/auth/queries.js
// Centralized React Query hooks for authentication-related data.

import { useGetQuery } from '../../api/api';
import { ENDPOINTS } from '../../api/endpoints';

const DEFAULT_OPTIONS = {
  staleTime: 30_000,
  refetchOnWindowFocus: true,
};

// Check auth status endpoint (e.g., { authenticated: boolean, ... })
export function useAuthStatus(options = {}) {
  return useGetQuery(ENDPOINTS.AUTH.STATUS, undefined, { ...DEFAULT_OPTIONS, ...options });
}

// Current authenticated user profile (e.g., { username, ... })
export function useCurrentUser(options = {}) {
  return useGetQuery(ENDPOINTS.USER, undefined, { ...DEFAULT_OPTIONS, ...options });
}
