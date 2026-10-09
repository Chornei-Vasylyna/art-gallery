import {
	Body,
	Controller,
	Post,
	Req,
	Res,
	UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Request, Response } from "express";
import {
	REFRESH_TOKEN_COOKIE,
	REFRESH_TOKEN_COOKIE_PATH,
} from "../constants/auth.constants.js";
import { LoginDto } from "../dto/login.dto.js";
import { RegisterDto } from "../dto/register.dto.js";
import { AuthService } from "../services/auth.service.js";
import type { AuthenticatedUser } from "../types/auth.types.js";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService,
	) {}

	@Post("register")
	async register(
		@Body() registerDto: RegisterDto,
		@Res({ passthrough: true }) response: Response,
	) {
		return this.respondWithTokens(
			response,
			await this.authService.register(registerDto),
		);
	}

	@Post("login")
	async login(
		@Body() loginDto: LoginDto,
		@Res({ passthrough: true }) response: Response,
	) {
		return this.respondWithTokens(
			response,
			await this.authService.login(loginDto),
		);
	}

	@Post("refresh")
	async refresh(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	) {
		const refreshToken = request.cookies?.[REFRESH_TOKEN_COOKIE];

		if (!refreshToken) {
			throw new UnauthorizedException("Refresh token is required");
		}

		return this.respondWithTokens(
			response,
			await this.authService.refresh(refreshToken),
		);
	}

	@Post("logout")
	async logout(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	) {
		const refreshToken = request.cookies?.[REFRESH_TOKEN_COOKIE];

		if (refreshToken) {
			await this.authService.logout(refreshToken);
		}

		response.clearCookie(REFRESH_TOKEN_COOKIE, {
			path: REFRESH_TOKEN_COOKIE_PATH,
		});

		return { success: true };
	}

	private respondWithTokens(
		response: Response,
		tokens: {
			accessToken: string;
			refreshToken: string;
			user: AuthenticatedUser;
		},
	) {
		const { refreshToken, ...responseBody } = tokens;

		response.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
			httpOnly: true,
			secure: this.configService.get<string>("NODE_ENV") === "production",
			sameSite: "lax",
			path: REFRESH_TOKEN_COOKIE_PATH,
		});

		return responseBody;
	}
}
