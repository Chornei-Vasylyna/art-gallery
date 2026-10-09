import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/model/useAuthStore";
import { Spinner } from "@/shared/components/ui/spinner";

export const PublicOnlyRoute = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const isInitialized = useAuthStore((state) => state.isInitialized);

	if (!isInitialized) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
				<Spinner className="size-8 text-primary" />
			</div>
		);
	}

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};
