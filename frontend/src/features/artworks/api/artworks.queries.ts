import { useQuery } from "@tanstack/react-query";
import { artworkKeys } from "./artworks.keys";
import { artworksService } from "./artworks.service";
import type { GetArtworksParams } from "./artworks.types";

export const useArtworksQuery = (params?: GetArtworksParams) => {
	return useQuery({
		queryKey: artworkKeys.list(params),
		queryFn: () => artworksService.getArtworks(params),
	});
};
