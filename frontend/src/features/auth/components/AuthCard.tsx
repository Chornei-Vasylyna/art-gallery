import type { PropsWithChildren } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";

type AuthCardProps = {
	title: string;
	description: string;
};

export const AuthCard = ({
	title,
	description,
	children,
}: PropsWithChildren<AuthCardProps>) => {
	return (
		<Card className="w-full max-w-md gap-0 rounded-2xl py-0 border-border/60 shadow-xl">
			<CardHeader className="gap-1.5 space-y-0 px-8 pt-8 pb-6 text-center">
				<CardTitle className="text-2xl font-semibold tracking-tight">
					{title}
				</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="px-8 pb-8 pt-0">{children}</CardContent>
		</Card>
	);
};
