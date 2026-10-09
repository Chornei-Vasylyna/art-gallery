import type { AxiosRequestConfig } from "axios";
import { apiClient, apiEndpoints } from "@/shared/api";
import type { AuthRefreshResponse, AuthResponse } from "@/shared/types";
import type { LoginCredentials, RegisterCredentials } from "./auth.types";

export const authService = {
	login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
		const { data } = await apiClient.post<AuthResponse>(
			apiEndpoints.auth.login,
			credentials,
		);

		return data;
	},

	register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
		const { data } = await apiClient.post<AuthResponse>(
			apiEndpoints.auth.register,
			credentials,
		);

		return data;
	},

	refresh: async (): Promise<AuthRefreshResponse> => {
		const refreshConfig: AxiosRequestConfig & { _retry: boolean } = {
			_retry: true,
		};

		const { data } = await apiClient.post<AuthRefreshResponse>(
			apiEndpoints.auth.refresh,
			undefined,
			refreshConfig,
		);

		return data;
	},

	logout: async (): Promise<void> => {
		await apiClient.post(apiEndpoints.auth.logout);
	},
};
