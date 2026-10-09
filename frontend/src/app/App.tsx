import { QueryProvider } from "./providers/QueryProvider";
import { AppRouterProvider } from "./providers/RouterProvider";

export const App = () => {
	return (
		<QueryProvider>
			<AppRouterProvider />
		</QueryProvider>
	);
};
