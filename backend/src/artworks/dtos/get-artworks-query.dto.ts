import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { ArtworkType } from "./artwork-type.enum.js";

export enum PriceSort {
	ASC = "asc",
	DESC = "desc",
}

export class GetArtworksQueryDto {
	@IsOptional()
	@IsString()
	@MaxLength(50)
	artist?: string;

	@IsOptional()
	@IsEnum(ArtworkType)
	type?: ArtworkType;

	@IsOptional()
	@IsEnum(PriceSort)
	sortByPrice?: PriceSort;
}