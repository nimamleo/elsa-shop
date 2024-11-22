import { MigrationInterface, QueryRunner } from "typeorm";

export class Asset1732220614803 implements MigrationInterface {
    name = 'Asset1732220614803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "asset" ("id" BIGSERIAL NOT NULL, "targetId" bigint NOT NULL, "name" character varying(255) NOT NULL, "mimetype" character varying(255) NOT NULL, "size" integer NOT NULL, "isPoster" boolean NOT NULL, "directoryPath" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "asset"`);
    }

}
