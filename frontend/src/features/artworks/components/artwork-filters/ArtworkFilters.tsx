import { Input } from "@/shared/components/ui/input";
import {
	type PriceSort,
	sortItems,
	type TypeFilter,
	typeItems,
} from "./artworkFilters.options";
import { FilterSelect } from "./FilterSelect";

type ArtworkFiltersProps = {
	onArtistChange: (artist: string) => void;
	onTypeChange: (type: TypeFilter) => void;
	onPriceSortChange: (sort: PriceSort) => void;
};

export const ArtworkFilters = ({
	onArtistChange,
	onTypeChange,
	onPriceSortChange,
}: ArtworkFiltersProps) => (
	<div className="flex flex-wrap items-center gap-3 mb-1">
		<Input
			placeholder="Search by artist..."
			maxLength={50}
			className="h-9 w-full sm:w-64"
			onChange={(e) => onArtistChange(e.target.value)}
		/>
		<FilterSelect
			items={typeItems}
			defaultValue="all"
			onChange={onTypeChange}
		/>
		<FilterSelect
			items={sortItems}
			defaultValue="all"
			onChange={onPriceSortChange}
		/>
	</div>
);
