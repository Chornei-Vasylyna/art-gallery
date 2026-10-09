import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import { JwtService, type JwtSignOptions } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare, hash } from "bcryptjs";
import type { Repository } from "typeorm";
import { User } from "../../db/entities/user.entity.js";
import type {
	AuthenticatedUser,
	JwtPayload,
	RefreshTokenPayload,
} from "../types/auth.types.js";

@Injectable()
export class TokenService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async issueTokens(user: AuthenticatedUser) {
		const payload: JwtPayload = {
			sub: user.id,
			email: user.email,
			roles: user.roles,
			type: "access",
		};

		const accessExpiresIn =
			this.configService.get<string>("JWT_ACCESS_EXPIRES_IN") || "15m";
		const refreshExpiresIn =
			this.configService.get<string>("JWT_REFRESH_EXPIRES_IN") || "7d";

		const accessToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.getOrThrow<string>("JWT_ACCESS_SECRET"),
			expiresIn: accessExpiresIn as JwtSignOptions["expiresIn"],
		});

		const refreshToken = await this.jwtService.signAsync(
			{ sub: user.id, type: "refresh" },
			{
				secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
				expiresIn: refreshExpiresIn as JwtSignOptions["expiresIn"],
			},
		);

		const refreshTokenHash = await hash(refreshToken, 12);

		await this.usersRepository.update(user.id, { refreshTokenHash });

		return {
			accessToken,
			refreshToken,
			expiresIn: accessExpiresIn,
			user,
		};
	}

	async refresh(token: string) {
		let payload: RefreshTokenPayload;

		try {
			payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(token, {
				secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
			});
		} catch {
			throw new UnauthorizedException("Invalid or expired refresh token");
		}

		if (payload.type !== "refresh") {
			throw new UnauthorizedException("Invalid refresh token");
		}

		const user = await this.usersRepository.findOne({
			select: { id: true, email: true, role: true, refreshTokenHash: true },
			where: { id: payload.sub },
		});

		if (
			!user?.refreshTokenHash ||
			!(await compare(token, user.refreshTokenHash))
		) {
			throw new UnauthorizedException("Invalid or expired refresh token");
		}

		return this.issueTokens({
			id: user.id,
			email: user.email,
			roles: [user.role],
		});
	}

	async logout(refreshToken: string) {
		try {
			const payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(
				refreshToken,
				{
					secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
				},
			);

			if (payload.type === "refresh" && payload.sub) {
				await this.usersRepository.update(payload.sub, {
					refreshTokenHash: null,
				});
			}
		} catch {}

		return { success: true };
	}
}
