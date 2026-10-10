import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useIsAdmin } from "@/features/auth/hooks/useIsAdmin";
import type { Artwork } from "../api/artworks.types";
import {
	type ArtworkFormValues,
	artworkFormSchema,
} from "../schemas/artworkForm.schema";

export const useArtworkForm = (
	artwork: Artwork,
	onSave: (values: ArtworkFormValues) => void,
) => {
	const { title, artist, type, price, availability } = artwork;
	const canEdit = useIsAdmin();

	const methods = useForm<ArtworkFormValues>({
		resolver: zodResolver(artworkFormSchema),
		defaultValues: { title, artist, type, price, availability },
	});

	const submit = methods.handleSubmit((values) => {
		onSave(values);
		methods.reset(values);
	});

	return { methods, submit, canEdit };
};
