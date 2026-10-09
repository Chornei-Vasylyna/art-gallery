import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../db/entities/user.entity.js";
import { AuthController } from "./controllers/auth.controller.js";
import { JwtAuthGuard } from "./guards/JwtAuthGuard.js";
import { RolesGuard } from "./guards/RolesGuard.js";
import { AuthService } from "./services/auth.service.js";
import { TokenService } from "./services/token.service.js";

@Module({
	imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
	controllers: [AuthController],
	providers: [AuthService, TokenService, JwtAuthGuard, RolesGuard],
	exports: [AuthService, TokenService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
