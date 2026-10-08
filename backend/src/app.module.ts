import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtworksController } from "./artworks/artworks.controller.js";
import { ArtworksModule } from "./artworks/artworks.module.js";
import { getDatabaseConfig } from "./db/database.config.js";

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: getDatabaseConfig,
		}),
		ArtworksModule,
	],
	controllers: [ArtworksController],
	providers: [],
})
export class AppModule {}
