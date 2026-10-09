export type AuthInterceptorCallbacks = {
	getAccessToken: () => string | null;
	setAccessToken: (accessToken: string) => void;
	onAuthFailed: () => void;
};

export type AuthUser = {
  id: string;
  email: string;
  roles: "user" | "admin";
};

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

export type AuthRefreshResponse = AuthResponse;