import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
	const user = { id: "testId", email: "test@gmail.com", roles: ["ADMIN"] };

	const location = useLocation();

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <Outlet />;
};
