import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Query,
} from "@nestjs/common";
import { ArtworksService } from "./artworks.service.js";
import { CreateArtworkDto } from "./dtos/create-artwork.dto.js";
import { GetArtworksQueryDto } from "./dtos/get-artworks-query.dto.js";
import { UpdateArtworkDto } from "./dtos/update-artwork.dto.js";

@Controller("artworks")
export class ArtworksController {
	constructor(private readonly artworksService: ArtworksService) {}

	@Get()
	findAll(@Query() query: GetArtworksQueryDto) {
		return this.artworksService.findAll(query);
	}

	@Get(":id")
	findOne(@Param("id", new ParseUUIDPipe()) id: string) {
		return this.artworksService.findOne(id);
	}

	@Post()
	create(@Body() createArtworkDto: CreateArtworkDto) {
		return this.artworksService.create(createArtworkDto);
	}

	@Put(":id")
	update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() updateArtworkDto: UpdateArtworkDto,
	) {
		return this.artworksService.update(id, updateArtworkDto);
	}

	@Delete(":id")
	async remove(@Param("id", ParseUUIDPipe) id: string) {
		await this.artworksService.remove(id);
	}
}
