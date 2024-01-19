const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class V11705686892749 {
    name = 'V11705686892749'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`species\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`homeworld\` varchar(255) NULL, \`language\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`film\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`episode_id\` varchar(255) NOT NULL, \`opening_crawl\` text NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` text NOT NULL, \`diameter\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`vehicles\` json NULL, \`starships\` json NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`url\` varchar(255) NOT NULL, \`homeworld\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`image_person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image\` varchar(255) NOT NULL, \`publicId\` varchar(255) NOT NULL, \`deleted_at\` timestamp(6) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`personId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species_film\` (\`species_id\` int NOT NULL, \`film_id\` int NOT NULL, INDEX \`IDX_5faf4f27306eebd5a407e6c26e\` (\`species_id\`), INDEX \`IDX_78aad5950b7e32ce123b5f3fed\` (\`film_id\`), PRIMARY KEY (\`species_id\`, \`film_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species_person\` (\`species_id\` int NOT NULL, \`person_id\` int NOT NULL, INDEX \`IDX_5f4a67c6e3c15e881a21a419ac\` (\`species_id\`), INDEX \`IDX_d558e4914b65efd642b9f66f13\` (\`person_id\`), PRIMARY KEY (\`species_id\`, \`person_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`person_film\` (\`person_id\` int NOT NULL, \`film_id\` int NOT NULL, INDEX \`IDX_52aefcfd3f58e9091e43396872\` (\`person_id\`), INDEX \`IDX_22f984b92dee71af3d7daa5f82\` (\`film_id\`), PRIMARY KEY (\`person_id\`, \`film_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_bc15517e0ebbab3fd38edf4029a\` FOREIGN KEY (\`homeworld\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`image_person\` ADD CONSTRAINT \`FK_41b33f410c401c115103b703969\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`species_film\` ADD CONSTRAINT \`species_film_species_id\` FOREIGN KEY (\`species_id\`) REFERENCES \`species\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`species_film\` ADD CONSTRAINT \`species_film_film_id\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`species_person\` ADD CONSTRAINT \`species_person_species_id\` FOREIGN KEY (\`species_id\`) REFERENCES \`species\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`species_person\` ADD CONSTRAINT \`species_person_person_id\` FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`person_film\` ADD CONSTRAINT \`person_film_character_id\` FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`person_film\` ADD CONSTRAINT \`person_film_film_id\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`person_film\` DROP FOREIGN KEY \`person_film_film_id\``);
        await queryRunner.query(`ALTER TABLE \`person_film\` DROP FOREIGN KEY \`person_film_character_id\``);
        await queryRunner.query(`ALTER TABLE \`species_person\` DROP FOREIGN KEY \`species_person_person_id\``);
        await queryRunner.query(`ALTER TABLE \`species_person\` DROP FOREIGN KEY \`species_person_species_id\``);
        await queryRunner.query(`ALTER TABLE \`species_film\` DROP FOREIGN KEY \`species_film_film_id\``);
        await queryRunner.query(`ALTER TABLE \`species_film\` DROP FOREIGN KEY \`species_film_species_id\``);
        await queryRunner.query(`ALTER TABLE \`image_person\` DROP FOREIGN KEY \`FK_41b33f410c401c115103b703969\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_bc15517e0ebbab3fd38edf4029a\``);
        await queryRunner.query(`DROP INDEX \`IDX_22f984b92dee71af3d7daa5f82\` ON \`person_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_52aefcfd3f58e9091e43396872\` ON \`person_film\``);
        await queryRunner.query(`DROP TABLE \`person_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_d558e4914b65efd642b9f66f13\` ON \`species_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_5f4a67c6e3c15e881a21a419ac\` ON \`species_person\``);
        await queryRunner.query(`DROP TABLE \`species_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_78aad5950b7e32ce123b5f3fed\` ON \`species_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_5faf4f27306eebd5a407e6c26e\` ON \`species_film\``);
        await queryRunner.query(`DROP TABLE \`species_film\``);
        await queryRunner.query(`DROP TABLE \`image_person\``);
        await queryRunner.query(`DROP TABLE \`person\``);
        await queryRunner.query(`DROP TABLE \`planet\``);
        await queryRunner.query(`DROP TABLE \`film\``);
        await queryRunner.query(`DROP TABLE \`species\``);
    }
}
