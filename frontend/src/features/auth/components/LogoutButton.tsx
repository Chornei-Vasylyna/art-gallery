import { LogOut } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useLogoutMutation } from "../api/auth.mutations";

export const LogoutButton = () => {
	const { mutate: logout, isPending } = useLogoutMutation();

	return (
		<Button
			variant="ghost"
			size="sm"
			disabled={isPending}
			onClick={() => logout()}
		>
			<LogOut className="size-4" />
			Log out
		</Button>
	);
};
