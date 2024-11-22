import { MigrationInterface, QueryRunner } from "typeorm";

export class Payment1732220552990 implements MigrationInterface {
    name = 'Payment1732220552990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment" ("id" BIGSERIAL NOT NULL, "price" integer NOT NULL, "taxPrice" integer NOT NULL, "discountPrice" integer NOT NULL DEFAULT '0', "totalPrice" integer NOT NULL, "status" character varying(255) NOT NULL, "productId" bigint NOT NULL, "userId" bigint NOT NULL, "discountId" bigint, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payment"`);
    }

}
