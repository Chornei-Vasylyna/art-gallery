import type { AxiosRequestConfig } from "axios";
import { apiEndpoints, baseApi } from "@/shared/api";
import type { AuthRefreshResponse, AuthResponse } from "@/shared/types";
import type { LoginCredentials, RegisterCredentials } from "./auth.types";

export const authService = {
	login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
		const { data } = await baseApi.post<AuthResponse>(
			apiEndpoints.auth.login,
			credentials,
		);

		return data;
	},

	register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
		const { data } = await baseApi.post<AuthResponse>(
			apiEndpoints.auth.register,
			credentials,
		);

		return data;
	},

	refresh: async (): Promise<AuthRefreshResponse> => {
		const refreshConfig: AxiosRequestConfig & { _retry: boolean } = {
			_retry: true,
		};

		const { data } = await baseApi.post<AuthRefreshResponse>(
			apiEndpoints.auth.refresh,
			undefined,
			refreshConfig,
		);

		return data;
	},

	logout: async (): Promise<void> => {
		await baseApi.post(apiEndpoints.auth.logout);
	},
};
