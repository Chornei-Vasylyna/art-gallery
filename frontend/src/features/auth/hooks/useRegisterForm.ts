import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/shared/api";
import { useRegisterMutation } from "../api/auth.mutations";
import { useAuthStore } from "../model/useAuthStore";
import {
	type RegisterFormData,
	registerSchema,
} from "../schemas/register.schema";

export const useRegisterForm = () => {
	const navigate = useNavigate();
	const setAuth = useAuthStore((state) => state.setAuth);
	const { mutate: register, isPending } = useRegisterMutation();

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: RegisterFormData) => {
		register(data, {
			onSuccess: (res) => {
				setAuth(res.user, res.accessToken);
				toast.success("Account created successfully!");
				navigate("/", { replace: true });
			},
			onError: (error) => {
				const message = getApiErrorMessage(
					error,
					"Registration failed. Please try again.",
				);
				toast.error(message);
			},
		});
	};

	return {
		form,
		onSubmit: form.handleSubmit(onSubmit),
		isPending,
	};
};
