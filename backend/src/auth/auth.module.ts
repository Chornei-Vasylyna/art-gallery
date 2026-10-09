import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule, type JwtSignOptions } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../db/entities/user.entity.js";
import { AuthController } from "./controllers/auth.controller.js";
import { JwtAuthGuard } from "./guards/JwtAuthGuard.js";
import { RolesGuard } from "./guards/RolesGuard.js";
import { AuthService } from "./services/auth.service.js";
import { TokenService } from "./services/token.service.js";

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.getOrThrow<string>("JWT_ACCESS_SECRET"),
				signOptions: {
					expiresIn: (configService.get<string>("JWT_ACCESS_EXPIRES_IN") ||
						"15m") as JwtSignOptions["expiresIn"],
				},
			}),
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, TokenService, JwtAuthGuard, RolesGuard],
	exports: [AuthService, TokenService, JwtAuthGuard, RolesGuard, JwtModule],
})
export class AuthModule {}
