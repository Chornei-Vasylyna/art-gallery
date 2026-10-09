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
		<Card className="w-full max-w-md rounded-2xl border-border/60 shadow-xl">
			<CardHeader className="space-y-2 px-8 pt-6 pb-3 text-center">
				<CardTitle className="text-2xl font-semibold tracking-tight">
					{title}
				</CardTitle>
				<CardDescription className="text-balance">
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent className="px-8 pb-8">{children}</CardContent>
		</Card>
	);
};
