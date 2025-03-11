import { MigrationInterface, QueryRunner } from 'typeorm';

export default class Optionsvalue1741454291449 implements MigrationInterface {
  name = 'Optionsvalue1741454291449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "OptionsValue" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "value" character varying NOT NULL, "productId" uuid, "optionId" uuid, CONSTRAINT "PK_5ec8cb0a1274b0ca93bef2199d7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "OptionsValueVariant" ("variantId" uuid NOT NULL, "optionsValueId" uuid NOT NULL, CONSTRAINT "PK_a3f800a48cbc482768a3bdb1b4a" PRIMARY KEY ("variantId", "optionsValueId"))`
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_0ad45f730430ee7e1b08803d23" ON "OptionsValueVariant" ("variantId") `
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_88ed4c02a57ab685b007280d5f" ON "OptionsValueVariant" ("optionsValueId") `
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "OptionsValue" DROP CONSTRAINT IF EXISTS "FK_73a333465f0a95949089f6e7c0b", ADD CONSTRAINT "FK_73a333465f0a95949089f6e7c0b" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "OptionsValue" DROP CONSTRAINT IF EXISTS "FK_13da43845274075859262b73d7c", ADD CONSTRAINT "FK_13da43845274075859262b73d7c" FOREIGN KEY ("optionId") REFERENCES "Options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "OptionsValueVariant" DROP CONSTRAINT IF EXISTS "FK_0ad45f730430ee7e1b08803d239", ADD CONSTRAINT "FK_0ad45f730430ee7e1b08803d239" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "OptionsValueVariant" DROP CONSTRAINT IF EXISTS "FK_88ed4c02a57ab685b007280d5fc", ADD CONSTRAINT "FK_88ed4c02a57ab685b007280d5fc" FOREIGN KEY ("optionsValueId") REFERENCES "OptionsValue"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "OptionsValueVariant" DROP CONSTRAINT "FK_88ed4c02a57ab685b007280d5fc"`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "OptionsValueVariant" DROP CONSTRAINT "FK_0ad45f730430ee7e1b08803d239"`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "OptionsValue" DROP CONSTRAINT "FK_13da43845274075859262b73d7c"`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "OptionsValue" DROP CONSTRAINT "FK_73a333465f0a95949089f6e7c0b"`
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_88ed4c02a57ab685b007280d5f"`
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_0ad45f730430ee7e1b08803d23"`
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "OptionsValueVariant"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "OptionsValue"`);
  }
}
