import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Role } from "../../auth/enums/role.enum.js";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	email: string;

	@Column({ select: false })
	passwordHash: string;

	@Column({ type: "varchar", nullable: true, select: false })
	refreshTokenHash: string | null;

	@Column({
		type: "enum",
		enum: Role,
		default: Role.USER,
	})
	role: Role;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
