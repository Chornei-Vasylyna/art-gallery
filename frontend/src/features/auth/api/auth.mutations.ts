import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/shared/api";
import type { AuthResponse } from "@/shared/types";
import { useAuthStore } from "../model/useAuthStore";
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

export const useLogoutMutation = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const clearAuth = useAuthStore((state) => state.clearAuth);

	return useMutation<void, Error>({
		mutationFn: authService.logout,
		onSettled: () => {
			clearAuth();
			queryClient.clear();
			navigate("/login", { replace: true });
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error, "Failed to log out."));
		},
	});
};
