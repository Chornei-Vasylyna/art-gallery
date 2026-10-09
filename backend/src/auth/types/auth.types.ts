import type { Role } from "../enums/role.enum.js";

export interface AuthenticatedUser {
    id: string;
    email: string;
    roles: Role[];
}

export interface JwtPayload {
    sub: string;
    email: string;
    roles: Role[];
    type: "access";
}

export interface RefreshTokenPayload {
    sub: string;
    type: "refresh";
}