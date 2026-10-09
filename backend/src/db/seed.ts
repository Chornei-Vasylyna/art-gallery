import "dotenv/config";
import { hash } from "bcryptjs";
import type { DataSource } from "typeorm";
import { ArtworkType } from "../artworks/enums/artwork-type.enum.js";
import { Role } from "../auth/enums/role.enum.js";
import dataSource from "./data-source.js";
import { Artwork, User } from "./entities/index.js";

const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@art-gallery.test";
const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "Admin123!";

const artworks = [
	{
		title: "Morning Light",
		artist: "Elena Rossi",
		type: ArtworkType.PAINTING,
		price: 1250,
		availability: true,
	},
	{
		title: "Blue Horizon",
		artist: "Elena Rossi",
		type: ArtworkType.PAINTING,
		price: 2450,
		availability: false,
	},
	{
		title: "Quiet Geometry",
		artist: "Marcus Lee",
		type: ArtworkType.DRAWING,
		price: 480,
		availability: true,
	},
	{
		title: "Stone Memory",
		artist: "Nadia Petrov",
		type: ArtworkType.SCULPTURE,
		price: 3900,
		availability: true,
	},
	{
		title: "Urban After Rain",
		artist: "Jon Bell",
		type: ArtworkType.PHOTOGRAPHY,
		price: 875,
		availability: false,
	},
	{
		title: "Golden Silence",
		artist: "Amina Yusuf",
		type: ArtworkType.PAINTING,
		price: 6400,
		availability: true,
	},
	{
		title: "Tidal Forms",
		artist: "Nadia Petrov",
		type: ArtworkType.SCULPTURE,
		price: 2150,
		availability: true,
	},
	{
		title: "Nocturne Study",
		artist: "Luca Marin",
		type: ArtworkType.DRAWING,
		price: 320,
		availability: true,
	},
];

async function seed(dataSource: DataSource): Promise<void> {
	await dataSource.runMigrations();

	const usersRepository = dataSource.getRepository(User);
	const artworksRepository = dataSource.getRepository(Artwork);

	await artworksRepository.clear();
	await usersRepository.clear();

	const admin = usersRepository.create({
		email: adminEmail.toLowerCase(),
		passwordHash: await hash(adminPassword, 12),
		role: Role.ADMIN,
	});
	await usersRepository.save(admin);

	await artworksRepository.save(artworksRepository.create(artworks));

	console.info(
		`Seeded ${artworks.length} artworks and admin user ${admin.email}.`,
	);
}

try {
	await dataSource.initialize();
	await seed(dataSource);
} catch (error) {
	console.error("Database seeding failed:", error);
	process.exitCode = 1;
} finally {
	if (dataSource.isInitialized) {
		await dataSource.destroy();
	}
}
