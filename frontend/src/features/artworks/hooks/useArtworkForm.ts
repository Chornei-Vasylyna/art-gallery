import { zodResolver } from "@hookform/resolvers/zod";
import type { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useIsAdmin } from "@/features/auth/hooks/useIsAdmin";
import type { Artwork } from "../api/artworks.types";
import {
	type ArtworkFormValues,
	artworkFormSchema,
} from "../schemas/artworkForm.schema";

export const useArtworkForm = (
	artwork: Artwork,
	onSave: UseMutateFunction<Artwork, Error, ArtworkFormValues>,
) => {
	const { title, artist, type, price, availability } = artwork;
	const canEdit = useIsAdmin();

	const methods = useForm<ArtworkFormValues>({
		resolver: zodResolver(artworkFormSchema),
		values: { title, artist, type, price: Number(price), availability },
		resetOptions: { keepDirtyValues: true },
	});

	const submit = methods.handleSubmit((values) => {
		if (!canEdit) return;
		onSave(values);
	});

	return { methods, submit, canEdit };
};
