import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import type { Option } from "./artworkFilters.options";

type FilterSelectProps<T extends string> = {
	items: Option<T>[];
	defaultValue: T;
	onChange: (value: T) => void;
};

export const FilterSelect = <T extends string>({
	items,
	defaultValue,
	onChange,
}: FilterSelectProps<T>) => (
	<Select
		items={items}
		defaultValue={defaultValue}
		onValueChange={(value) => onChange((value ?? defaultValue) as T)}
	>
		<SelectTrigger className="min-w-36 data-[size=default]:h-9">
			<SelectValue />
		</SelectTrigger>
		<SelectContent>
			{items.map((item) => (
				<SelectItem key={item.value} value={item.value}>
					{item.label}
				</SelectItem>
			))}
		</SelectContent>
	</Select>
);
