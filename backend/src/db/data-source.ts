import "dotenv/config";
import { DataSource, type DataSourceOptions } from "typeorm";
import { Artwork, User } from "./entities/index.js";

export const dataSourceOptions: DataSourceOptions = {
	type: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT || 5432),
	username: process.env.DB_USERNAME || "postgres",
	password: process.env.DB_PASSWORD || "postgres",
	database: process.env.DB_DATABASE || "art_gallery",
	entities: [Artwork, User],
	migrations: [`${import.meta.dirname}/migrations/*{.ts,.js}`],
};

export default new DataSource(dataSourceOptions);
