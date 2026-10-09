import {
	type CanActivate,
	type ExecutionContext,
	ForbiddenException,
	Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";
import { ROLES_KEY } from "../decorators/roles.decorator.js";
import type { Role } from "../enums/role.enum.js";
import type { AuthenticatedUser } from "../types/auth.types.js";

type AuthenticatedRequest = Request & { user: AuthenticatedUser };

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!requiredRoles?.length) {
			return true;
		}

		const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

		if (!request.user?.roles) {
			throw new ForbiddenException("Insufficient role");
		}

		const hasRole = requiredRoles.some((role) =>
			request.user.roles.includes(role),
		);

		if (!hasRole) {
			throw new ForbiddenException("Insufficient role");
		}

		return true;
	}
}
