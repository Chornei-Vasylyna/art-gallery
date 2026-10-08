import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtworksModule } from "./artworks/artworks.module.js";
import { getDatabaseConfig } from "./db/database.config.js";

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getDatabaseConfig,
		}),
		ArtworksModule,
	],
	providers: [],
})
export class AppModule {}
