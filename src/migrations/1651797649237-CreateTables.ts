import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1651797649237 implements MigrationInterface {
  name = 'CreateTables1651797649237';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "country" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "city" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "countryId" integer, CONSTRAINT "REL_990b8a57ab901cb812e2b52fcf" UNIQUE ("countryId"), CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "cityId" integer, CONSTRAINT "REL_3624b3085165071df70276a400" UNIQUE ("cityId"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, "addressId" integer, CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId"), CONSTRAINT "REL_14e847e346e37ff3da35078a6c" UNIQUE ("addressId"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" ADD CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_3624b3085165071df70276a4000" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_14e847e346e37ff3da35078a6c8" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_14e847e346e37ff3da35078a6c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_3624b3085165071df70276a4000"`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" DROP CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0"`,
    );
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "city"`);
    await queryRunner.query(`DROP TABLE "country"`);
  }
}
