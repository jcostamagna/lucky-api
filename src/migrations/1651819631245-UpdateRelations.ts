import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRelations1651819631245 implements MigrationInterface {
  name = 'UpdateRelations1651819631245';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "city" DROP CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "city"."countryId" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "city" DROP CONSTRAINT "REL_990b8a57ab901cb812e2b52fcf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_3624b3085165071df70276a4000"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "address"."cityId" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "REL_3624b3085165071df70276a400"`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" ADD CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_3624b3085165071df70276a4000" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_3624b3085165071df70276a4000"`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" DROP CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "REL_3624b3085165071df70276a400" UNIQUE ("cityId")`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "address"."cityId" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_3624b3085165071df70276a4000" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" ADD CONSTRAINT "REL_990b8a57ab901cb812e2b52fcf" UNIQUE ("countryId")`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "city"."countryId" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "city" ADD CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
