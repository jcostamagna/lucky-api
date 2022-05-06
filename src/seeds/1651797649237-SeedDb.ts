import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1651797649237 implements MigrationInterface {
  name = 'SeedDb1651797649237';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" (username, password) VALUES ('asd', '$2b$10$m9Bp/u9bi5buXfgioTN1GuoZjTRnPkZvrfvyA3ofZVfcLxQTAJkBa'), ('user 2', '$2b$10$UstLUAxemdS7.iRIU2SXKe6LO1LgLDbvCElrcpOCv3qxn5KK.KT/u'), ('user 3' ,'$2b$10$bbQBRDXaqTeeHvQNVGNg8.3clbh4dE9omu6RLYt6Llav2r8rmNfdi')`,
    );

    await queryRunner.query(
      `INSERT INTO "country" (name) VALUES ('Argentina'), ('Estados Unidos'), ('Egipto')`,
    );

    await queryRunner.query(
      `INSERT INTO "city" (name, "countryId") VALUES ('Buenos Aires', 1), ('Washington DC', 2), ('El Cairo', 3)`,
    );

    await queryRunner.query(
      `INSERT INTO "address" (street, "cityId") VALUES ('Rivadavia', 1), ('Lincoln street', 2), ('Giza street', 3)`,
    );

    await queryRunner.query(
      `INSERT INTO "profile" ("userId", "addressId", name) VALUES (1, 1, 'Juan'), (2, 2, 'Matt'), (3, 3, 'Ibrahim')`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
