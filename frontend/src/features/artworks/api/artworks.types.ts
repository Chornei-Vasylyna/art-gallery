export const ArtworkType = {
	PAINTING: "painting",
	SCULPTURE: "sculpture",
	DRAWING: "drawing",
	PHOTOGRAPHY: "photography",
} as const;

export type ArtworkType = (typeof ArtworkType)[keyof typeof ArtworkType];

export type Artwork = {
	id: string;
	title: string;
	artist: string;
	type: ArtworkType;
	price: number;
	availability: boolean;
};

export type GetArtworksParams = {
	sortByPrice?: "asc" | "desc";
	artist?: string;
	type?: ArtworkType;
};

export type CreateArtworkDto = {
	title: string;
	artist: string;
	type: ArtworkType;
	price: number;
	availability?: boolean;
};

export type UpdateArtworkDto = Partial<CreateArtworkDto>;
