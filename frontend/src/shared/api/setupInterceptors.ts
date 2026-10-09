import type { AxiosInstance } from "axios";
import { createRequestInterceptor } from "@/shared/api/interceptors/request";
import { createResponseInterceptor } from "@/shared/api/interceptors/response";
import type { AuthInterceptorCallbacks } from "@/shared/types";

export const setupInterceptors = (
	api: AxiosInstance,
	callbacks: AuthInterceptorCallbacks,
) => {
	api.interceptors.request.use(
		createRequestInterceptor(callbacks.getAccessToken),
	);
	api.interceptors.response.use(
		(response) => response,
		createResponseInterceptor(api, callbacks),
	);
};