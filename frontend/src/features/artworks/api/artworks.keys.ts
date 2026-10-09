import type { GetArtworksParams } from "./artworks.types";

export const artworkKeys = {
	all: ["artworks"] as const,
	lists: () => [...artworkKeys.all, "list"] as const,
	list: (params?: GetArtworksParams) =>
		[...artworkKeys.lists(), params] as const,
	details: () => [...artworkKeys.all, "detail"] as const,
	detail: (id: string) => [...artworkKeys.details(), id] as const,
};
