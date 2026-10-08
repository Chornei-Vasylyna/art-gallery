import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Artwork } from "../db/entities/artwork.entity.js";
import { ArtworksController } from "./artworks.controller.js";
import { ArtworksService } from "./artworks.service.js";

@Module({
	imports: [TypeOrmModule.forFeature([Artwork])],
	controllers: [ArtworksController],
	providers: [ArtworksService],
})
export class ArtworksModule {}
