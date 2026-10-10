import { z } from "zod";
import { ArtworkType } from "../api/artworks.types";

export const artworkFormSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, "Title is required")
		.max(99, "Title is too long (max 99)"),
	artist: z
		.string()
		.trim()
		.min(1, "Artist is required")
		.max(50, "Artist name is too long (max 50)"),
	type: z.enum(ArtworkType),
	price: z
		.number({ error: "Price is required" })
		.positive("Price must be greater than 0"),
	availability: z.boolean(),
});

export type ArtworkFormValues = z.infer<typeof artworkFormSchema>;
