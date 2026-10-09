import { AspectRatio } from "@/shared/components/ui/aspect-ratio";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import type { Artwork } from "../api/artworks.types";

type ArtworkCardProps = {
	artwork: Artwork;
	canDelete: boolean;
	onDelete: (id: string) => void;
	isDeleting: boolean;
};

export const ArtworkCard = ({
	artwork,
	canDelete,
	onDelete,
	isDeleting,
}: ArtworkCardProps) => {
	const { id, title, type, artist, price, availability } = artwork;
	return (
		<Card
			className={cn(
				"gap-0 rounded-xl bg-card py-0 shadow-sm ring-1 transition-shadow hover:shadow-md",
			)}
		>
			<AspectRatio ratio={2 / 1} className="bg-muted"></AspectRatio>

			<CardHeader className="gap-1 px-4 pt-4 pb-0">
				<div className="flex items-baseline justify-between gap-3">
					<CardTitle className="text-base font-semibold leading-tight">
						{title}
					</CardTitle>
					<span className="shrink-0 text-base font-semibold">${price}</span>
				</div>
				<p className="text-xs text-muted-foreground">By: {artist}</p>
			</CardHeader>

			<CardContent className="flex items-center justify-between px-4 pt-3 pb-0">
				<span className="text-xs capitalize text-muted-foreground">{type}</span>
				<Badge
					variant={availability ? "default" : "secondary"}
					className="text-xs"
				>
					{availability ? "Available" : "Unavailable"}
				</Badge>
			</CardContent>

			<CardFooter className="px-4 pt-0 pb-4 mt-3">
				{canDelete && (
					<Button
						variant="outline"
						size="sm"
						className="w-full border-destructive/30 text-destructive hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
						disabled={isDeleting}
						onClick={() => onDelete(id)}
					>
						Remove Artwork
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};
