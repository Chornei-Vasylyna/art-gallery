import { Controller } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import type { Artwork, UpdateArtworkDto } from "../../api/artworks.types";
import { useArtworkForm } from "../../hooks/useArtworkForm";
import { FormField } from "../FormField";
import { TypeSelectField } from "../TypeSelectField";

type ArtworkEditFormProps = {
	artwork: Artwork;
	isSaving: boolean;
	onSave: (values: UpdateArtworkDto) => void;
};

export const ArtworkEditForm = ({
	artwork,
	isSaving,
	onSave,
}: ArtworkEditFormProps) => {
	const { methods, submit, canEdit } = useArtworkForm(artwork, onSave);
	const {
		register,
		control,
		formState: { errors, isDirty },
	} = methods;

	return (
		<form onSubmit={submit} className="space-y-5">
			<fieldset disabled={!canEdit} className="min-w-0 space-y-5">
				<FormField label="Title" htmlFor="title" error={errors.title?.message}>
					<Input id="title" className="h-9" {...register("title")} />
				</FormField>

				<FormField
					label="Artist"
					htmlFor="artist"
					error={errors.artist?.message}
				>
					<Input id="artist" className="h-9" {...register("artist")} />
				</FormField>

				<div className="grid gap-5 sm:grid-cols-2">
					<TypeSelectField control={control} disabled={!canEdit} />

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
								disabled={!canEdit}
								className="cursor-pointer"
							/>
						)}
					/>
				</div>

				{canEdit && (
					<div className="flex justify-end">
						<Button type="submit" disabled={!isDirty || isSaving}>
							{isSaving ? "Saving..." : "Save changes"}
						</Button>
					</div>
				)}
			</fieldset>
		</form>
	);
};
