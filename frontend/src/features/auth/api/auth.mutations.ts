import { useMutation } from "@tanstack/react-query";
import type { AuthResponse } from "@/shared/types";
import { authService } from "./auth.service";
import type { LoginCredentials, RegisterCredentials } from "./auth.types";

export const useLoginMutation = () =>
	useMutation<AuthResponse, Error, LoginCredentials>({
		mutationFn: authService.login,
	});

export const useRegisterMutation = () =>
	useMutation<AuthResponse, Error, RegisterCredentials>({
		mutationFn: authService.register,
	});

export const useLogoutMutation = () =>
	useMutation<void, Error>({
		mutationFn: authService.logout,
	});
