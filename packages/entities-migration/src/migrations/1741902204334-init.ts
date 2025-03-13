import { MigrationInterface, QueryRunner } from 'typeorm';

export default class Init1741902204334 implements MigrationInterface {
  name = 'Init1741902204334';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "value" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "parentId" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `DO $$
        BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_status_enum') THEN
        CREATE TYPE "public"."product_status_enum" AS ENUM('draft', 'published', 'archived');
        END IF;
      END $$;`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "description" text NOT NULL, "status" "public"."product_status_enum" NOT NULL DEFAULT 'draft', CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "product_tags_tag" ("productId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_8da52c0bc9255c6cb07af25ac73" PRIMARY KEY ("productId", "tagId"))`
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_208235f4a5c925f11171252b76" ON "product_tags_tag" ("productId") `
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_0de90b04710a86601acdff88c2" ON "product_tags_tag" ("tagId") `
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "product_categories_category" ("productId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_17f2a361443184000ee8d79f240" PRIMARY KEY ("productId", "categoryId"))`
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_342d06dd0583aafc156e076379" ON "product_categories_category" ("productId") `
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_15520e638eb4c46c4fb2c61c4b" ON "product_categories_category" ("categoryId") `
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "category" DROP CONSTRAINT IF EXISTS "FK_d5456fd7e4c4866fec8ada1fa10", ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "product_tags_tag" DROP CONSTRAINT IF EXISTS "FK_208235f4a5c925f11171252b760", ADD CONSTRAINT "FK_208235f4a5c925f11171252b760" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "product_tags_tag" DROP CONSTRAINT IF EXISTS "FK_0de90b04710a86601acdff88c21", ADD CONSTRAINT "FK_0de90b04710a86601acdff88c21" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "product_categories_category" DROP CONSTRAINT IF EXISTS "FK_342d06dd0583aafc156e0763790", ADD CONSTRAINT "FK_342d06dd0583aafc156e0763790" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "product_categories_category" DROP CONSTRAINT IF EXISTS "FK_15520e638eb4c46c4fb2c61c4b4", ADD CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "product_categories_category" DROP CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4"`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "product_categories_category" DROP CONSTRAINT "FK_342d06dd0583aafc156e0763790"`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "product_tags_tag" DROP CONSTRAINT "FK_0de90b04710a86601acdff88c21"`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "product_tags_tag" DROP CONSTRAINT "FK_208235f4a5c925f11171252b760"`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "category" DROP CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10"`
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_15520e638eb4c46c4fb2c61c4b"`
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_342d06dd0583aafc156e076379"`
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "product_categories_category"`
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_0de90b04710a86601acdff88c2"`
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_208235f4a5c925f11171252b76"`
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "product_tags_tag"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "product"`);
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."product_status_enum"`
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "category"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "tag"`);
  }
}
