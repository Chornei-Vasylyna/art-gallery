import { apiClient } from "@/shared/api";
import { apiEndpoints } from "@/shared/api/endpoints";
import type {
	Artwork,
	CreateArtworkDto,
	GetArtworksParams,
	UpdateArtworkDto,
} from "./artworks.types";

export const artworksService = {
	getArtworks: async (params?: GetArtworksParams): Promise<Artwork[]> => {
		const response = await apiClient.get<Artwork[]>(apiEndpoints.artworks.list, {
			params,
		});
		return response.data;
	},

	getArtworkById: async (id: string): Promise<Artwork> => {
		const response = await apiClient.get<Artwork>(apiEndpoints.artworks.details(id));
		return response.data;
	},

	createArtwork: async (
		createArtworkDto: CreateArtworkDto,
	): Promise<Artwork> => {
		const response = await apiClient.post<Artwork>(
			apiEndpoints.artworks.create,
			createArtworkDto,
		);
		return response.data;
	},

	updateArtwork: async (
		id: string,
		updateArtworkDto: UpdateArtworkDto,
	): Promise<Artwork> => {
		const response = await apiClient.put<Artwork>(
			apiEndpoints.artworks.update(id),
			updateArtworkDto,
		);
		return response.data;
	},

	deleteArtwork: async (id: string): Promise<void> => {
		await apiClient.delete(apiEndpoints.artworks.remove(id));
	},
};
