import { Outlet } from "react-router-dom";

export const RootLayout = () => {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="border-b py-4">
				<div className="container mx-auto px-4">
					<h1 className="text-lg font-bold">Art Gallery</h1>
				</div>
			</header>

			<main className="flex-1 container mx-auto px-4 py-6">
				<Outlet />
			</main>

			<footer className="border-t py-4 text-center text-sm text-muted-foreground">
				<div className="container mx-auto px-4">
					© {new Date().getFullYear()} Art Gallery
				</div>
			</footer>
		</div>
	);
};
