import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/features/auth/model/useAuthStore.js";

export const ProtectedRoute = () => {
	const user = useAuthStore((state) => state.user);

	const location = useLocation();

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <Outlet />;
};
