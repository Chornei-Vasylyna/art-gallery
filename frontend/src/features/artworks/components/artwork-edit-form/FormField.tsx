import type { PropsWithChildren } from "react";
import { Label } from "@/shared/components/ui/label";

type FormFieldProps = {
	label: string;
	htmlFor?: string;
	error?: string;
};

export const FormField = ({
	label,
	htmlFor,
	error,
	children,
}: PropsWithChildren<FormFieldProps>) => (
	<div className="space-y-1.5">
		<Label htmlFor={htmlFor}>{label}</Label>
		{children}
		{error && <p className="text-xs text-destructive">{error}</p>}
	</div>
);
