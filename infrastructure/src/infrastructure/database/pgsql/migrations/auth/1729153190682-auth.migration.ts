import { MigrationInterface, QueryRunner } from "typeorm";

export class Auth1729153190682 implements MigrationInterface {
    name = 'Auth1729153190682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth" ("id" BIGSERIAL NOT NULL, "userId" bigint NOT NULL, "refreshToken" text NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "auth"`);
    }

}
