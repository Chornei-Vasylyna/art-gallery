import {
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	MaxLength,
} from "class-validator";
import { ArtworkType } from "./artwork-type.enum.js";

export class CreateArtworkDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(99)
	title: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	artist: string;

	@IsEnum(ArtworkType)
	@IsNotEmpty()
	type: ArtworkType;

	@IsNumber()
	@IsPositive()
	price: number;

	@IsBoolean()
	@IsOptional()
	availability?: boolean;
}
