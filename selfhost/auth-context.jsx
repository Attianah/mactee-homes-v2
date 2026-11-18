// The public site has no sign-in, so the provider is a pass-through.
export function AuthProvider({ children }) {
  return children;
}

export function useAuth() {
  return {
    user: null,
    isAuthenticated: false,
    isLoadingAuth: false,
    refresh: async () => null,
    logout: async () => {},
    navigateToLogin: () => {},
  };
}