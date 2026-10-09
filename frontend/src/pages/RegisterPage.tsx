import { AuthCard } from "@/features/auth/components/AuthCard";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const RegisterPage = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50/60 p-4 dark:bg-slate-950">
			<AuthCard
				title="Create an account"
				description="Enter your email and password below to create your account"
			>
				<RegisterForm />
			</AuthCard>
		</div>
	);
};
