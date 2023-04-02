import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTables1680457140925 implements MigrationInterface {
  name = 'addTables1680457140925';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tables" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_7cf2aca7af9550742f855d4eb69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tables" ADD CONSTRAINT "FK_5c95523a4954b2638496d22827d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tables" DROP CONSTRAINT "FK_5c95523a4954b2638496d22827d"`,
    );
    await queryRunner.query(`DROP TABLE "tables"`);
  }
}
