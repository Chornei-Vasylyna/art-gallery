import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/shared/api";
import { useLoginMutation } from "../api/auth.mutations";
import { useAuthStore } from "../model/useAuthStore";
import { type LoginFormData, loginSchema } from "../schemas/login.schema";

export const useLoginForm = () => {
	const navigate = useNavigate();
	const setAuth = useAuthStore((state) => state.setAuth);
	const { mutate: login, isPending } = useLoginMutation();

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: LoginFormData) => {
		login(data, {
			onSuccess: (res) => {
				setAuth(res.user, res.accessToken);
				toast.success("Successfully logged in!");
				navigate("/", { replace: true });
			},
			onError: (error) => {
				const message = getApiErrorMessage(
					error,
					"Invalid email or password. Please try again.",
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
