import { QueryProvider } from "./providers/QueryProvider";
import { AppRouterProvider } from "./providers/RouterProvider";
import { ToastProvider } from "./providers/ToastProvider";

export const App = () => {
	return (
		<QueryProvider>
			<ToastProvider>
				<AppRouterProvider />
			</ToastProvider>
		</QueryProvider>
	);
};
