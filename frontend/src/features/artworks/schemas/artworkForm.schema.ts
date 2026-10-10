import { z } from "zod";
import { ArtworkType } from "../api/artworks.types";

export const artworkFormSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, "Title is required")
		.max(100, "Title is too long (max 100)"),
	artist: z
		.string()
		.trim()
		.min(1, "Artist is required")
		.max(50, "Artist name is too long (max 50)"),
	type: z.enum(ArtworkType),
	price: z
		.number({ error: "Price is required" })
		.min(0, "Price can't be negative"),
	availability: z.boolean(),
});

export type ArtworkFormValues = z.infer<typeof artworkFormSchema>;
