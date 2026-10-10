import { useState } from "react";
import { useIsAdmin } from "@/features/auth/hooks/useIsAdmin";
import { useAuthStore } from "@/features/auth/model/useAuthStore";
import { useDeleteArtworkMutation } from "../api/artworks.mutations";
import { useArtworksQuery } from "../api/artworks.queries";
import type { ArtworkType, GetArtworksParams } from "../api/artworks.types";

const PAGE_SIZE = 4;

export const useArtworks = () => {
	const { user } = useAuthStore();
	console.log(user);
	const canDelete = useIsAdmin();

	const [filters, setFilters] = useState<GetArtworksParams>({});
	const [page, setPage] = useState(1);
	const { data: artworks = [], isLoading, error } = useArtworksQuery(filters);
	const { mutate: deleteArtwork, isPending: isDeleting } =
		useDeleteArtworkMutation();

	const totalPages = Math.max(1, Math.ceil(artworks.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages);
	const paginatedArtworks = artworks.slice(
		(currentPage - 1) * PAGE_SIZE,
		currentPage * PAGE_SIZE,
	);

	const handlePageChange = (nextPage: number) => {
		setPage(Math.min(Math.max(1, nextPage), totalPages));
	};

	const handleSortPrice = (order: "asc" | "desc" | "all") => {
		setFilters((prev) => ({
			...prev,
			sortByPrice: order === "all" ? undefined : order,
		}));
		setPage(1);
	};

	const handleFilterType = (type: ArtworkType | "all") => {
		setFilters((prev) => ({
			...prev,
			type: type === "all" ? undefined : type,
		}));
		setPage(1);
	};

	const handleFilterArtist = (artist: string) => {
		setFilters((prev) => ({
			...prev,
			artist: artist.trim() || undefined,
		}));
		setPage(1);
	};

	return {
		artworks: paginatedArtworks,
		isLoading,
		error,
		filters,
		isDeleting,
		canDelete,
		page: currentPage,
		totalPages,
		handlePageChange,
		handleSortPrice,
		handleFilterType,
		handleFilterArtist,
		deleteArtwork,
	};
};
