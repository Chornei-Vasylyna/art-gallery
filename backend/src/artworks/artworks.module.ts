import { Module } from '@nestjs/common';
import { ArtworksService } from './artworks.service.js';

@Module({
  providers: [ArtworksService]
})
export class ArtworksModule {}
