import { type Control, Controller } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { ArtworkType } from "../api/artworks.types";
import type { ArtworkFormValues } from "../schemas/artworkForm.schema";
import { FormField } from "./FormField";

const typeItems = Object.values(ArtworkType).map((type) => ({
	label: type.charAt(0).toUpperCase() + type.slice(1),
	value: type,
}));

type TypeSelectFieldProps = {
	control: Control<ArtworkFormValues>;
	disabled?: boolean;
};

export const TypeSelectField = ({
	control,
	disabled,
}: TypeSelectFieldProps) => (
	<FormField label="Type">
		<Controller
			name="type"
			control={control}
			render={({ field }) => (
				<Select
					items={typeItems}
					value={field.value}
					disabled={disabled}
					onValueChange={(value) => value && field.onChange(value)}
				>
					<SelectTrigger className="w-full data-[size=default]:h-9">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{typeItems.map((item) => (
							<SelectItem key={item.value} value={item.value}>
								{item.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		/>
	</FormField>
);
