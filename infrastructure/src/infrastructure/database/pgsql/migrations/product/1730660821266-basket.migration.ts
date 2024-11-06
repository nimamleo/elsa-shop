import { MigrationInterface, QueryRunner } from 'typeorm';

export class Basket1730660821266 implements MigrationInterface {
  name = 'Basket1730660821266';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "basket" ("id" BIGSERIAL NOT NULL, "userId" bigint NOT NULL, "productId" bigint NOT NULL, "productInfoId" bigint NOT NULL, "count" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "infoId" bigint, CONSTRAINT "PK_895e6f44b73a72425e434a614cc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "basket" ADD CONSTRAINT "FK_9d24569bde430378e920f27083b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "basket" ADD CONSTRAINT "FK_fd87545adb4dfba3eddb54a4989" FOREIGN KEY ("infoId") REFERENCES "info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "basket" DROP CONSTRAINT "FK_fd87545adb4dfba3eddb54a4989"`,
    );
    await queryRunner.query(
      `ALTER TABLE "basket" DROP CONSTRAINT "FK_9d24569bde430378e920f27083b"`,
    );
    await queryRunner.query(`DROP TABLE "basket"`);
  }
}
