import { useAuthStore } from "../model/useAuthStore";

export const useIsAdmin = () => {
	const user = useAuthStore((state) => state.user);
    
	return !!user?.roles.includes("admin");
};
