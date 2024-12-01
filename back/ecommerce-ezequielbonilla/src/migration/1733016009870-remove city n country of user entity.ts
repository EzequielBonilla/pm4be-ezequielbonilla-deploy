// import { MigrationInterface, QueryRunner } from "typeorm";

// export class RemoveCityNCountryOfUserEntity1733016009870 implements MigrationInterface {
//     name = 'RemoveCityNCountryOfUserEntity1733016009870'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country"`);
//         await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "city"`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "users" ADD "city" character varying(50)`);
//         await queryRunner.query(`ALTER TABLE "users" ADD "country" character varying(50)`);
//     }

// }
