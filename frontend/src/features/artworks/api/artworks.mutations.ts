import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/shared/api";
import { artworkKeys } from "./artworks.keys";
import { artworksService } from "./artworks.service";
import type { CreateArtworkDto, UpdateArtworkDto } from "./artworks.types";

export const useCreateArtworkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: CreateArtworkDto) => artworksService.createArtwork(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: artworkKeys.lists() });
			toast.success("Artwork added successfully!");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error, "Failed to add artwork."));
		},
	});
};

export const useDeleteArtworkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => artworksService.deleteArtwork(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: artworkKeys.lists() });
			toast.success("Artwork removed successfully!");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error, "Failed to delete artwork."));
		},
	});
};

export const useUpdateArtworkMutation = (id: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: UpdateArtworkDto) =>
			artworksService.updateArtwork(id, dto),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: artworkKeys.lists() });
			queryClient.invalidateQueries({ queryKey: artworkKeys.detail(id) });
			toast.success("Artwork updated successfully!");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error, "Failed to update artwork."));
		},
	});
};
