import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { compare, hash } from "bcryptjs";
import type { Repository } from "typeorm";
import { User } from "../../db/entities/user.entity.js";
import { LoginDto } from "../dto/login.dto.js";
import { RegisterDto } from "../dto/register.dto.js";
import { Role } from "../enums/role.enum.js";
import { TokenService } from "../services/token.service.js";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly tokenService: TokenService,
	) {}

	async register(registerDto: RegisterDto) {
		const email = registerDto.email.toLowerCase();

		const existingUser = await this.usersRepository.findOne({
			select: { id: true },
			where: { email },
		});

		if (existingUser) {
			throw new ConflictException("Email is already registered");
		}

		const passwordHash = await hash(registerDto.password, 12);

		const user = this.usersRepository.create({
			email,
			passwordHash,
			role: Role.USER,
		});

		await this.usersRepository.save(user);

		return this.tokenService.issueTokens({
			id: user.id,
			email: user.email,
			roles: [user.role],
		});
	}

	async login(loginDto: LoginDto) {
		const email = loginDto.email.toLowerCase();

		const user = await this.usersRepository.findOne({
			select: { id: true, email: true, passwordHash: true, role: true },
			where: { email },
		});

		if (!user || !(await compare(loginDto.password, user.passwordHash))) {
			throw new UnauthorizedException("Invalid email or password");
		}

		return this.tokenService.issueTokens({
			id: user.id,
			email: user.email,
			roles: [user.role],
		});
	}

	refresh(token: string) {
		return this.tokenService.refresh(token);
	}

	logout(token: string) {
		return this.tokenService.logout(token);
	}
}
