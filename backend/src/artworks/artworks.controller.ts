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
	UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/JwtAuthGuard.js";
import { RolesGuard } from "../auth/guards/RolesGuard.js";
import { ArtworksService } from "./artworks.service.js";
import { CreateArtworkDto } from "./dto/create-artwork.dto.js";
import { GetArtworksQueryDto } from "./dto/get-artworks-query.dto.js";
import { UpdateArtworkDto } from "./dto/update-artwork.dto.js";
import { Roles } from "../auth/decorators/roles.decorator.js";
import { Role } from "../auth/enums/role.enum.js";

@UseGuards(JwtAuthGuard, RolesGuard)
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

	@Roles(Role.ADMIN)
	@Post()
	create(@Body() createArtworkDto: CreateArtworkDto) {
		return this.artworksService.create(createArtworkDto);
	}

	@Roles(Role.ADMIN)
	@Put(":id")
	update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() updateArtworkDto: UpdateArtworkDto,
	) {
		return this.artworksService.update(id, updateArtworkDto);
	}

	@Roles(Role.ADMIN)
	@Delete(":id")
	async remove(@Param("id", ParseUUIDPipe) id: string) {
		await this.artworksService.remove(id);
	}
}
