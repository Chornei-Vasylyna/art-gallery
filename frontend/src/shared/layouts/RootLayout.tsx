import { Palette } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { Footer } from "./Footer";

export const RootLayout = () => {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="border-b py-4">
				<div className="container mx-auto flex items-center justify-between px-4">
					<Link to="/" className="flex items-center gap-x-2">
						<Palette
							className="size-5 fill-current [&_circle]:fill-background [&_circle]:stroke-background"
							aria-hidden="true"
						/>
						<span className="text-lg font-bold">ArtGalleryManager</span>
					</Link>
					<LogoutButton />
				</div>
			</header>

			<main className="flex-1 bg-muted/40">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
};
