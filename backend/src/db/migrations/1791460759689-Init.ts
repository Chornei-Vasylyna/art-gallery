import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1791460759689 implements MigrationInterface {
    name = 'Init1791460759689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artwork" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(99) NOT NULL, "artist" character varying(50) NOT NULL, "type" character varying(50) NOT NULL, "price" numeric(14,2) NOT NULL, "availability" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_ee2e7c5ad7226179d4113a96fa8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "artwork"`);
    }

}
