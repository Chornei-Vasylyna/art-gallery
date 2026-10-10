import { ArtworkCard } from "@/features/artworks/components/ArtworkCard";
import { ArtworkPagination } from "@/features/artworks/components/ArtworkPagination";
import { ArtworkFilters } from "@/features/artworks/components/artwork-filters/ArtworkFilters";
import { CreateArtworkDialog } from "@/features/artworks/components/create-artwork/CreateArtworkDialog";
import { useArtworks } from "@/features/artworks/hooks/useArtworks";
import { Spinner } from "@/shared/components/ui/spinner";

export const ArtworksPage = () => {
	const {
		artworks,
		isLoading,
		isDeleting,
		isAdmin,
		page,
		totalPages,
		handlePageChange,
		handleFilterArtist,
		handleFilterType,
		handleSortPrice,
		deleteArtwork,
	} = useArtworks();

	return (
		<div className="container mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8">
			<h1 className="text-2xl font-bold tracking-tight">
				Explore Our Collection
			</h1>

			<div className="flex flex-wrap items-center justify-between gap-3">
				<ArtworkFilters
					onArtistChange={handleFilterArtist}
					onTypeChange={handleFilterType}
					onPriceSortChange={handleSortPrice}
				/>
				{isAdmin && <CreateArtworkDialog />}
			</div>

			{isLoading ? (
				<div className="flex justify-center py-12">
					<Spinner className="size-8 text-primary" />
				</div>
			) : artworks.length === 0 ? (
				<div className="py-12 text-center text-muted-foreground">
					No artworks found.
				</div>
			) : (
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{artworks.map((artwork) => (
						<ArtworkCard
							key={artwork.id}
							artwork={artwork}
							canDelete={isAdmin}
							isDeleting={isDeleting}
							onDelete={deleteArtwork}
						/>
					))}
				</div>
			)}

			<ArtworkPagination
				page={page}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};
