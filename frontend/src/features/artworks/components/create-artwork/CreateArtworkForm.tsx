import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import { useCreateArtworkMutation } from "../../api/artworks.mutations";
import { ArtworkType } from "../../api/artworks.types";
import {
	type ArtworkFormValues,
	artworkFormSchema,
} from "../../schemas/artworkForm.schema";
import { FormField } from "../FormField";
import { TypeSelectField } from "../TypeSelectField";

type CreateArtworkFormProps = {
	onSuccess: () => void;
	onCancel: () => void;
};

export const CreateArtworkForm = ({
	onSuccess,
	onCancel,
}: CreateArtworkFormProps) => {
	const { mutate, isPending } = useCreateArtworkMutation();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ArtworkFormValues>({
		resolver: zodResolver(artworkFormSchema),
		defaultValues: {
			title: "",
			artist: "",
			type: Object.values(ArtworkType)[0],
			price: 0,
			availability: true,
		},
	});

	const submit = handleSubmit((values) => mutate(values, { onSuccess }));

	return (
		<form onSubmit={submit} className="space-y-5">
			<FormField label="Title" htmlFor="title" error={errors.title?.message}>
				<Input id="title" className="h-9" {...register("title")} />
			</FormField>

			<FormField label="Artist" htmlFor="artist" error={errors.artist?.message}>
				<Input id="artist" className="h-9" {...register("artist")} />
			</FormField>

			<div className="grid gap-5 sm:grid-cols-2">
				<TypeSelectField control={control} />

				<FormField
					label="Price ($)"
					htmlFor="price"
					error={errors.price?.message}
				>
					<Input
						id="price"
						type="number"
						step="0.01"
						className="h-9"
						{...register("price", { valueAsNumber: true })}
					/>
				</FormField>
			</div>

			<div className="flex items-center justify-between rounded-xl border p-3">
				<Label htmlFor="availability">Available for sale</Label>
				<Controller
					name="availability"
					control={control}
					render={({ field }) => (
						<Switch
							id="availability"
							checked={field.value}
							onCheckedChange={field.onChange}
							className="cursor-pointer"
						/>
					)}
				/>
			</div>

			<div className="flex justify-end gap-2">
				<Button
					type="button"
					variant="outline"
					disabled={isPending}
					onClick={onCancel}
				>
					Cancel
				</Button>
				<Button type="submit" disabled={isPending}>
					{isPending ? "Creating..." : "Create artwork"}
				</Button>
			</div>
		</form>
	);
};
