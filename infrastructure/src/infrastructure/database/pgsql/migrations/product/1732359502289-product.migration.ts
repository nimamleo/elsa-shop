import { MigrationInterface, QueryRunner } from 'typeorm';

export class Product1732359502289 implements MigrationInterface {
  name = 'Product1732359502289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" BIGSERIAL NOT NULL, "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "basket" ("id" BIGSERIAL NOT NULL, "userId" bigint NOT NULL, "productId" bigint NOT NULL, "productInfoId" bigint NOT NULL, "count" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_895e6f44b73a72425e434a614cc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" BIGSERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "price" integer NOT NULL, "quality" character varying NOT NULL, "country" character varying NOT NULL, "categoryId" bigint NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "size" ("id" BIGSERIAL NOT NULL, "title" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_66e3a0111d969aa0e5f73855c7a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "color" ("id" BIGSERIAL NOT NULL, "title" character varying(255) NOT NULL, "hex" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "country" ("id" BIGSERIAL NOT NULL, "title" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "info" ("id" BIGSERIAL NOT NULL, "colorId" bigint NOT NULL, "sizeId" bigint NOT NULL, "qualityId" bigint NOT NULL, "countryId" bigint NOT NULL, "count" integer NOT NULL, "productId" bigint NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_687dc5e25f4f1ee093a45b68bb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "quality" ("id" BIGSERIAL NOT NULL, "title" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_de46699eb30a39f7d9000ec9ad5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "basket" ADD CONSTRAINT "FK_9d24569bde430378e920f27083b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "basket" ADD CONSTRAINT "FK_d1c517bd755da14bf68d1b72724" FOREIGN KEY ("productInfoId") REFERENCES "info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" ADD CONSTRAINT "FK_0f6654094346d4ebb23ac07203b" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" ADD CONSTRAINT "FK_28b53ba5000849dbb6e5a5db25a" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" ADD CONSTRAINT "FK_809b73d1ed2b89a24d666afa198" FOREIGN KEY ("qualityId") REFERENCES "quality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" ADD CONSTRAINT "FK_af14c533d907432312695cc2652" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" ADD CONSTRAINT "FK_ae4ed66df447d36c2c9f9706080" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "info" DROP CONSTRAINT "FK_ae4ed66df447d36c2c9f9706080"`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" DROP CONSTRAINT "FK_af14c533d907432312695cc2652"`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" DROP CONSTRAINT "FK_809b73d1ed2b89a24d666afa198"`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" DROP CONSTRAINT "FK_28b53ba5000849dbb6e5a5db25a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" DROP CONSTRAINT "FK_0f6654094346d4ebb23ac07203b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`,
    );
    await queryRunner.query(
      `ALTER TABLE "basket" DROP CONSTRAINT "FK_d1c517bd755da14bf68d1b72724"`,
    );
    await queryRunner.query(
      `ALTER TABLE "basket" DROP CONSTRAINT "FK_9d24569bde430378e920f27083b"`,
    );
    await queryRunner.query(`DROP TABLE "quality"`);
    await queryRunner.query(`DROP TABLE "info"`);
    await queryRunner.query(`DROP TABLE "country"`);
    await queryRunner.query(`DROP TABLE "color"`);
    await queryRunner.query(`DROP TABLE "size"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "basket"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
