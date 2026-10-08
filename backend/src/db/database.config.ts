import { ConfigService } from "@nestjs/config";
import type { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getDatabaseConfig = (
	configService: ConfigService,
): TypeOrmModuleOptions => ({
	type: "postgres",
	host: configService.get<string>("DB_HOST", "localhost"),
	port: Number(configService.get("DB_PORT", 5432)),
	username: configService.get<string>("DB_USERNAME", "postgres"),
	password: configService.get<string>("DB_PASSWORD", "postgres"),
	database: configService.get<string>("DB_DATABASE", "art_gallery"),
	migrations: [`${import.meta.dirname}/migrations/*{.ts,.js}`],
	autoLoadEntities: true,
});
