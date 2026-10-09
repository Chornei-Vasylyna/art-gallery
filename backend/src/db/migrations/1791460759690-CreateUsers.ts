import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1791460759690 implements MigrationInterface {
	name = "CreateUsers1791460759690";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`,
		);
		await queryRunner.query(
			`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "refreshTokenHash" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_users_email" UNIQUE ("email"), CONSTRAINT "PK_users_id" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "users"`);
		await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
	}
}
