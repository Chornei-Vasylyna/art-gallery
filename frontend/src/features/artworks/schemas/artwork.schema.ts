import { z } from "zod";
import { ArtworkType } from "../api/artworks.types";

export const artworkSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, "Title is required")
		.max(99, "Title cannot exceed 99 characters"),
	artist: z
		.string()
		.trim()
		.min(1, "Artist is required")
		.max(50, "Artist name cannot exceed 50 characters"),
	type: z.enum(ArtworkType, { error: "Please select a valid artwork type" }),
	price: z
		.number({ error: "Price must be a number" })
		.positive("Price must be greater than 0"),
	availability: z.boolean(),
});

export type ArtworkFormData = z.infer<typeof artworkSchema>;
