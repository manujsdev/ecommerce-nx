import { MigrationInterface, QueryRunner } from 'typeorm';

export default class Init1741379248657 implements MigrationInterface {
  name = 'Init1741379248657';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "Tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "value" character varying NOT NULL, CONSTRAINT "PK_61aa7408a426fea5dd8416f5a12" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "Categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "parentId" uuid, CONSTRAINT "PK_537b5c00afe7427c4fc9434cd59" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "Options" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "productId" uuid, CONSTRAINT "PK_dbfac933e3b433c6d8f8013760c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "Variant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "sku" character varying NOT NULL, "ean" character varying NOT NULL, "barcode" character varying NOT NULL, "quantity" integer NOT NULL, "weight" integer NOT NULL, "length" integer NOT NULL, "height" integer NOT NULL, "width" integer NOT NULL, "productId" uuid, CONSTRAINT "PK_148c66441ba19a4ce92f93ffc10" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `
      DO $$
        BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Product_status_enum') THEN
        CREATE TYPE "public"."Product_status_enum" AS ENUM('draft', 'published', 'archived');
        END IF;
      END $$;`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "Product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "description" text NOT NULL, "status" "public"."Product_status_enum" NOT NULL DEFAULT 'draft', CONSTRAINT "PK_9fc040db7872192bbc26c515710" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "TagProducts" ("productId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_c8148890c38e4b46ceffb9ac10d" PRIMARY KEY ("productId", "tagsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_79a205fc9e84ec5fcf1253f037" ON "TagProducts" ("productId") `
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_d7c540d88e67c98705096bcfc6" ON "TagProducts" ("tagsId") `
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "ProductCategories" ("productId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_f695c8b9ceab9bbb412da977b0f" PRIMARY KEY ("productId", "categoriesId"))`
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_5d9d943f5b8a48c001472249c1" ON "ProductCategories" ("productId") `
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_e2a3f20cee70c6d1ddc5107d37" ON "ProductCategories" ("categoriesId") `
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "Categories" DROP CONSTRAINT IF EXISTS "FK_1eabf8acaf25797323ad4cecc9d", ADD CONSTRAINT "FK_1eabf8acaf25797323ad4cecc9d" FOREIGN KEY ("parentId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "Options" DROP CONSTRAINT IF EXISTS "FK_0360b795bbe7fdcdb0b0d5b096a", ADD CONSTRAINT "FK_0360b795bbe7fdcdb0b0d5b096a" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "Variant" DROP CONSTRAINT IF EXISTS "FK_79a205fc9e84ec5fcf1253f0373", ADD CONSTRAINT "FK_79a205fc9e84ec5fcf1253f0373" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "TagProducts" DROP CONSTRAINT IF EXISTS "FK_79a205fc9e84ec5fcf1253f0373", ADD CONSTRAINT "FK_79a205fc9e84ec5fcf1253f0373" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "TagProducts" DROP CONSTRAINT IF EXISTS "FK_d7c540d88e67c98705096bcfc6d", ADD CONSTRAINT "FK_d7c540d88e67c98705096bcfc6d" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "ProductCategories" DROP CONSTRAINT IF EXISTS "FK_5d9d943f5b8a48c001472249c1e", ADD CONSTRAINT "FK_5d9d943f5b8a48c001472249c1e" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "ProductCategories" DROP CONSTRAINT IF EXISTS "FK_e2a3f20cee70c6d1ddc5107d377", ADD CONSTRAINT "FK_e2a3f20cee70c6d1ddc5107d377" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "ProductCategories" DROP CONSTRAINT "FK_e2a3f20cee70c6d1ddc5107d377"`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "ProductCategories" DROP CONSTRAINT "FK_5d9d943f5b8a48c001472249c1e"`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "TagProducts" DROP CONSTRAINT "FK_d7c540d88e67c98705096bcfc6d"`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "TagProducts" DROP CONSTRAINT "FK_79a205fc9e84ec5fcf1253f0373"`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "Variant" DROP CONSTRAINT "FK_0646ccf9ed30e9b708aced6a755"`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "Options" DROP CONSTRAINT "FK_0360b795bbe7fdcdb0b0d5b096a"`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "Categories" DROP CONSTRAINT "FK_1eabf8acaf25797323ad4cecc9d"`
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_e2a3f20cee70c6d1ddc5107d37"`
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_5d9d943f5b8a48c001472249c1"`
    );
    await queryRunner.query(`DROP TABLE "ProductCategories"`);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_d7c540d88e67c98705096bcfc6"`
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."IDX_79a205fc9e84ec5fcf1253f037"`
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "TagProducts"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "Product"`);
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."Product_status_enum"`
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "Variant"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "Options"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "Categories"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "Tags"`);
  }
}
