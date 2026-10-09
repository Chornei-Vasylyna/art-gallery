import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ArtworkDetailsPage } from "@/pages/ArtworkDetailsPage";
import { ArtworksPage } from "@/pages/ArtworksPage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { RootLayout } from "@/shared/layouts/RootLayout";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},

	{
		element: <RootLayout />,
		children: [
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: "/",
						element: <ArtworksPage />,
					},
					{
						path: "/artworks/:id",
						element: <ArtworkDetailsPage />,
					},
				],
			},

			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
]);

export function AppRouter() {
	return <RouterProvider router={router} />;
}
