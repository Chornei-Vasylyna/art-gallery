import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app/index.css";
import { App } from "@/app/App.tsx";
import { useAuthStore } from "./features/auth/model/useAuthStore";
import { baseApi, setupInterceptors } from "./shared/api";

setupInterceptors(baseApi, {
	getAccessToken: () => useAuthStore.getState().accessToken,
	setAccessToken: (accessToken) =>
		useAuthStore.getState().setAccessToken(accessToken),
	onAuthFailed: () => {
		useAuthStore.getState().clearAuth();
		window.location.assign("/login");
	},
});

useAuthStore.getState().checkAuth();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
