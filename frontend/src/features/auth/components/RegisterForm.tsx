import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import { useRegisterForm } from "../hooks/useRegisterForm";

export const RegisterForm = () => {
	const { form, onSubmit, isPending } = useRegisterForm();
	const {
		register,
		formState: { errors },
	} = form;

	return (
		<form onSubmit={onSubmit} className="space-y-5">
			<div className="flex flex-col gap-2 text-left">
				<label htmlFor="email" className="text-sm font-medium leading-none">
					Email
				</label>
				<Input
					id="email"
					type="email"
					autoComplete="email"
					placeholder="name@example.com"
					className={cn(
						"h-11",
						errors.email &&
							"border-destructive/30 shadow-[0_0_14px_2px] shadow-destructive/15 focus-visible:ring-destructive/10",
					)}
					{...register("email")}
				/>
				{errors.email && (
					<p className="text-xs font-medium text-destructive">
						{errors.email.message}
					</p>
				)}
			</div>

			<div className="flex flex-col gap-2 text-left">
				<label htmlFor="password" className="text-sm font-medium leading-none">
					Password
				</label>
				<Input
					id="password"
					type="password"
					autoComplete="new-password"
					placeholder="••••••••"
					className={cn(
						"h-11",
						errors.password &&
							"border-destructive/30 shadow-[0_0_14px_2px] shadow-destructive/15 focus-visible:ring-destructive/10",
					)}
					{...register("password")}
				/>
				{errors.password && (
					<p className="text-xs font-medium text-destructive">
						{errors.password.message}
					</p>
				)}
			</div>

			<Button type="submit" className="h-11 w-full" disabled={isPending}>
				{isPending ? "Creating account..." : "Create account"}
			</Button>

			<p className="pt-1 text-center text-sm text-muted-foreground">
				Already have an account?{" "}
				<Link
					to="/login"
					className="font-semibold text-primary underline-offset-4 hover:underline"
				>
					Sign in
				</Link>
			</p>
		</form>
	);
};
