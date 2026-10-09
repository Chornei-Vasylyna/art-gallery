import { Palette } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export const RootLayout = () => {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="border-b py-4">
				<div className="container mx-auto px-4 flex gap-x-2 items-center">
					<Palette
						className="size-5 fill-current [&_circle]:fill-background [&_circle]:stroke-background"
						aria-hidden="true"
					/>
					<span className="text-lg font-bold">ArtGalleryManager</span>
				</div>
			</header>

			<main className="flex-1 bg-muted/40">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
};
