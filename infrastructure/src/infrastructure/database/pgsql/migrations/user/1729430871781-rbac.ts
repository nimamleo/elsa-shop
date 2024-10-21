import { MigrationInterface, QueryRunner } from 'typeorm';

export class Rbac1729430871781 implements MigrationInterface {
  name = 'Rbac1729430871781';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying NOT NULL default 'user'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
  }
}
