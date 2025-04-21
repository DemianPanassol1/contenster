import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMessagesTable1745254680677 implements MigrationInterface {
    name = 'CreateMessagesTable1745254680677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "name" character varying(75) NOT NULL, "email" character varying(150) NOT NULL, "phone" character varying(75) NOT NULL, "subject" character varying(75) NOT NULL, "content" text NOT NULL, "read" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
