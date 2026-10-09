import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtworksModule } from "./artworks/artworks.module.js";
import { AuthModule } from "./auth/auth.module.js";
import { getDatabaseConfig } from "./db/database.config.js";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: getDatabaseConfig,
		}),
		ArtworksModule,
		AuthModule,
	],
	providers: [],
})
export class AppModule {}
