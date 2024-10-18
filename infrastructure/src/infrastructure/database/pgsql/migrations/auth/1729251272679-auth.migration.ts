import { MigrationInterface, QueryRunner } from "typeorm";

export class Auth1729251272679 implements MigrationInterface {
    name = 'Auth1729251272679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth" ("id" BIGSERIAL NOT NULL, "userId" bigint NOT NULL, "refreshToken" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_373ead146f110f04dad60848154" UNIQUE ("userId"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "auth"`);
    }

}
