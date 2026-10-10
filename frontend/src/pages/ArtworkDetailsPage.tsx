import { Link, useParams } from "react-router-dom";
import { AspectRatio } from "@/shared/components/ui/aspect-ratio";
import { Spinner } from "@/shared/components/ui/spinner";
import { useUpdateArtworkMutation } from "../features/artworks/api/artworks.mutations";
import { useArtworkQuery } from "../features/artworks/api/artworks.queries";
import { ArtworkEditForm } from "../features/artworks/components/artwork-edit-form/ArtworkEditForm";

export const ArtworkDetailsPage = () => {
	const { id = "" } = useParams<{ id: string }>();
	const { data: artwork, isPending, isError } = useArtworkQuery(id);
	const { mutate: updateArtwork, isPending: isSaving } =
		useUpdateArtworkMutation(id);

	if (isPending) {
		return (
			<div className="flex min-h-[50vh] items-center justify-center">
				<Spinner className="size-6" />
			</div>
		);
	}

	if (isError || !artwork) {
		return <p className="p-6 text-sm">Artwork not found</p>;
	}

	return (
		<div className="mx-auto max-w-2xl space-y-6 p-6">
			<div className="space-y-1">
				<Link to="/" className="text-xs text-muted-foreground hover:underline">
					← Back to artworks
				</Link>
				<h1 className="text-2xl font-semibold">{artwork.title}</h1>
			</div>

			<AspectRatio ratio={16 / 5} className="rounded-xl bg-muted" />

			<ArtworkEditForm
				key={artwork.id}
				artwork={artwork}
				isSaving={isSaving}
				onSave={updateArtwork}
			/>
		</div>
	);
};
