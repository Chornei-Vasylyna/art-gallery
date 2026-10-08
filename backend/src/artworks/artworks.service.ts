import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { FindOptionsOrder, Repository } from "typeorm";
import { Artwork } from "../db/entities/artwork.entity.js";
import type { CreateArtworkDto } from "./dtos/create-artwork.dto.js";
import {
	type GetArtworksQueryDto,
	PriceSort,
} from "./dtos/get-artworks-query.dto.js";
import type { UpdateArtworkDto } from "./dtos/update-artwork.dto.js";

@Injectable()
export class ArtworksService {
	constructor(
		@InjectRepository(Artwork)
		private readonly artworksRepository: Repository<Artwork>,
	) {}

	findAll(query: GetArtworksQueryDto): Promise<Artwork[]> {
		const { artist, type, sortByPrice } = query;

		const order: FindOptionsOrder<Artwork> | undefined = sortByPrice
			? { price: sortByPrice === PriceSort.ASC ? "ASC" : "DESC" }
			: undefined;

		return this.artworksRepository.find({
			where: {
				...(artist ? { artist } : {}),
				...(type ? { type } : {}),
			},
			order,
		});
	}

	async findOne(id: string): Promise<Artwork> {
		const artwork = await this.artworksRepository.findOneBy({ id });

		if (!artwork) {
			throw new NotFoundException(`Artwork with id "${id}" not found`);
		}

		return artwork;
	}

	create(createArtworkDto: CreateArtworkDto): Promise<Artwork> {
		const artwork = this.artworksRepository.create(createArtworkDto);
		
		return this.artworksRepository.save(artwork);
	}

	async update(
		id: string,
		updateArtworkDto: UpdateArtworkDto,
	): Promise<Artwork> {
		const artwork = await this.artworksRepository.preload({
			id,
			...updateArtworkDto,
		});

		if (!artwork) {
			throw new NotFoundException(`Artwork with id "${id}" not found`);
		}

		return this.artworksRepository.save(artwork);
	}

	async remove(id: string): Promise<void> {
		const result = await this.artworksRepository.delete(id);
		
		if (result.affected === 0) {
			throw new NotFoundException(`Artwork with id "${id}" not found`);
		}
	}
}
