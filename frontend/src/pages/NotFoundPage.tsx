import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";

export const NotFoundPage = () => {
	return (
		<div className="container mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
			<p className="text-7xl font-bold tracking-tight text-muted-foreground/40">
				404
			</p>
			<h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
			<p className="text-sm text-muted-foreground">
				The page you are looking for does not exist or has been moved.
			</p>
			<Button render={<Link to="/" />} className="mt-2">
				Back to the gallery
			</Button>
		</div>
	);
};
