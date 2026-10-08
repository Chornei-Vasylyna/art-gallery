import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
      		forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.setGlobalPrefix("api");

	const port = configService.get<number>("PORT") ?? 3000;
	await app.listen(port);
}

await bootstrap();
