import { ArtworkType } from "../../api/artworks.types";

export type Option<T extends string> = { label: string; value: T };

export type TypeFilter = ArtworkType | "all";
export type PriceSort = "asc" | "desc" | "all";

const capitalize = (value: string) =>
	value.charAt(0).toUpperCase() + value.slice(1);

export const typeItems: Option<TypeFilter>[] = [
	{ label: "All Types", value: "all" },
	...Object.values(ArtworkType).map((type) => ({
		label: capitalize(type),
		value: type,
	})),
];

export const sortItems: Option<PriceSort>[] = [
	{ label: "Sort by", value: "all" },
	{ label: "Price: Low to High", value: "asc" },
	{ label: "Price: High to Low", value: "desc" },
];
