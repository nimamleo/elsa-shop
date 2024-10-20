import { MigrationInterface, QueryRunner } from 'typeorm';

export class Product1729430530801 implements MigrationInterface {
  name = 'Product1729430530801';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" BIGSERIAL NOT NULL, "title" "public"."category_title_enum" NOT NULL, "slug" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "info" ("id" BIGSERIAL NOT NULL, "color" character varying(255) NOT NULL, "size" character varying NOT NULL, "count" integer NOT NULL, "productId" bigint NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_687dc5e25f4f1ee093a45b68bb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" BIGSERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "price" integer NOT NULL, "quality" character varying NOT NULL, "country" character varying NOT NULL, "categoryId" bigint NOT NULL , "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" ADD CONSTRAINT "FK_ae4ed66df447d36c2c9f9706080" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" DROP CONSTRAINT "FK_ae4ed66df447d36c2c9f9706080"`,
    );
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "info"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
