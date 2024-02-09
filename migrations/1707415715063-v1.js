const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class V11707415715063 {
    name = 'V11707415715063'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`image_person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image\` varchar(255) NOT NULL, \`deleted_at\` timestamp(6) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`personId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` text NOT NULL, \`diameter\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`homeworld\` varchar(255) NULL, \`language\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starship\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`hyperdrive_rating\` varchar(255) NOT NULL, \`MGLT\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`url\` varchar(255) NOT NULL, \`homeworld\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`film\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`episode_id\` varchar(255) NOT NULL, \`opening_crawl\` text NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planet_film\` (\`planet_id\` int NOT NULL, \`film_id\` int NOT NULL, INDEX \`IDX_0eb506799ac4bf5f78570a2450\` (\`planet_id\`), INDEX \`IDX_092b0534049588c9622b44874b\` (\`film_id\`), PRIMARY KEY (\`planet_id\`, \`film_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planet_species\` (\`planet_id\` int NOT NULL, \`species_id\` int NOT NULL, INDEX \`IDX_b1dd5afead177d1c0d2d3a79b9\` (\`planet_id\`), INDEX \`IDX_95094b6b3dfb31859956d52396\` (\`species_id\`), PRIMARY KEY (\`planet_id\`, \`species_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species_film\` (\`species_id\` int NOT NULL, \`film_id\` int NOT NULL, INDEX \`IDX_5faf4f27306eebd5a407e6c26e\` (\`species_id\`), INDEX \`IDX_78aad5950b7e32ce123b5f3fed\` (\`film_id\`), PRIMARY KEY (\`species_id\`, \`film_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species_person\` (\`species_id\` int NOT NULL, \`person_id\` int NOT NULL, INDEX \`IDX_5f4a67c6e3c15e881a21a419ac\` (\`species_id\`), INDEX \`IDX_d558e4914b65efd642b9f66f13\` (\`person_id\`), PRIMARY KEY (\`species_id\`, \`person_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships_person\` (\`starship_id\` int NOT NULL, \`person_id\` int NOT NULL, INDEX \`IDX_21fc491395d026eb07a518b71e\` (\`starship_id\`), INDEX \`IDX_a5772881beef0be99f472d608d\` (\`person_id\`), PRIMARY KEY (\`starship_id\`, \`person_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships_film\` (\`starship_id\` int NOT NULL, \`film_id\` int NOT NULL, INDEX \`IDX_199ec4b25699908a6d507dcce1\` (\`starship_id\`), INDEX \`IDX_cb5e3484f0fe0a779049c1fe3e\` (\`film_id\`), PRIMARY KEY (\`starship_id\`, \`film_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles_person\` (\`vehicle_id\` int NOT NULL, \`person_id\` int NOT NULL, INDEX \`IDX_8a743eebcb4295fa098b1100a5\` (\`vehicle_id\`), INDEX \`IDX_bc7633a1366439bcee113a033c\` (\`person_id\`), PRIMARY KEY (\`vehicle_id\`, \`person_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles_film\` (\`vehicle_id\` int NOT NULL, \`film_id\` int NOT NULL, INDEX \`IDX_5419daffae6088b3809c93cd79\` (\`vehicle_id\`), INDEX \`IDX_afc98cd9b4ed2555ad1fda3738\` (\`film_id\`), PRIMARY KEY (\`vehicle_id\`, \`film_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`person_film\` (\`person_id\` int NOT NULL, \`film_id\` int NOT NULL, INDEX \`IDX_52aefcfd3f58e9091e43396872\` (\`person_id\`), INDEX \`IDX_22f984b92dee71af3d7daa5f82\` (\`film_id\`), PRIMARY KEY (\`person_id\`, \`film_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`image_person\` ADD CONSTRAINT \`FK_41b33f410c401c115103b703969\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_bc15517e0ebbab3fd38edf4029a\` FOREIGN KEY (\`homeworld\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`planet_film\` ADD CONSTRAINT \`planet_film_planet_id\` FOREIGN KEY (\`planet_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`planet_film\` ADD CONSTRAINT \`planet_film_film_id\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`planet_species\` ADD CONSTRAINT \`planet_species_planet_id\` FOREIGN KEY (\`planet_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`planet_species\` ADD CONSTRAINT \`planet_species_species_id\` FOREIGN KEY (\`species_id\`) REFERENCES \`species\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`species_film\` ADD CONSTRAINT \`species_film_species_id\` FOREIGN KEY (\`species_id\`) REFERENCES \`species\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`species_film\` ADD CONSTRAINT \`species_film_film_id\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`species_person\` ADD CONSTRAINT \`species_person_species_id\` FOREIGN KEY (\`species_id\`) REFERENCES \`species\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`species_person\` ADD CONSTRAINT \`species_person_person_id\` FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`starships_person\` ADD CONSTRAINT \`starship_person_starship_id\` FOREIGN KEY (\`starship_id\`) REFERENCES \`starship\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`starships_person\` ADD CONSTRAINT \`starship_person_person_id\` FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`starships_film\` ADD CONSTRAINT \`starship_film_starship_id\` FOREIGN KEY (\`starship_id\`) REFERENCES \`starship\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`starships_film\` ADD CONSTRAINT \`starship_film_film_id\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vehicles_person\` ADD CONSTRAINT \`vehicles_person_vehicle_id\` FOREIGN KEY (\`vehicle_id\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vehicles_person\` ADD CONSTRAINT \`vehicles_person_person_id\` FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vehicles_film\` ADD CONSTRAINT \`vehicles_film_vehicle_id\` FOREIGN KEY (\`vehicle_id\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vehicles_film\` ADD CONSTRAINT \`vehicles_film_film_id\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`person_film\` ADD CONSTRAINT \`person_film_character_id\` FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`person_film\` ADD CONSTRAINT \`person_film_film_id\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`person_film\` DROP FOREIGN KEY \`person_film_film_id\``);
        await queryRunner.query(`ALTER TABLE \`person_film\` DROP FOREIGN KEY \`person_film_character_id\``);
        await queryRunner.query(`ALTER TABLE \`vehicles_film\` DROP FOREIGN KEY \`vehicles_film_film_id\``);
        await queryRunner.query(`ALTER TABLE \`vehicles_film\` DROP FOREIGN KEY \`vehicles_film_vehicle_id\``);
        await queryRunner.query(`ALTER TABLE \`vehicles_person\` DROP FOREIGN KEY \`vehicles_person_person_id\``);
        await queryRunner.query(`ALTER TABLE \`vehicles_person\` DROP FOREIGN KEY \`vehicles_person_vehicle_id\``);
        await queryRunner.query(`ALTER TABLE \`starships_film\` DROP FOREIGN KEY \`starship_film_film_id\``);
        await queryRunner.query(`ALTER TABLE \`starships_film\` DROP FOREIGN KEY \`starship_film_starship_id\``);
        await queryRunner.query(`ALTER TABLE \`starships_person\` DROP FOREIGN KEY \`starship_person_person_id\``);
        await queryRunner.query(`ALTER TABLE \`starships_person\` DROP FOREIGN KEY \`starship_person_starship_id\``);
        await queryRunner.query(`ALTER TABLE \`species_person\` DROP FOREIGN KEY \`species_person_person_id\``);
        await queryRunner.query(`ALTER TABLE \`species_person\` DROP FOREIGN KEY \`species_person_species_id\``);
        await queryRunner.query(`ALTER TABLE \`species_film\` DROP FOREIGN KEY \`species_film_film_id\``);
        await queryRunner.query(`ALTER TABLE \`species_film\` DROP FOREIGN KEY \`species_film_species_id\``);
        await queryRunner.query(`ALTER TABLE \`planet_species\` DROP FOREIGN KEY \`planet_species_species_id\``);
        await queryRunner.query(`ALTER TABLE \`planet_species\` DROP FOREIGN KEY \`planet_species_planet_id\``);
        await queryRunner.query(`ALTER TABLE \`planet_film\` DROP FOREIGN KEY \`planet_film_film_id\``);
        await queryRunner.query(`ALTER TABLE \`planet_film\` DROP FOREIGN KEY \`planet_film_planet_id\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_bc15517e0ebbab3fd38edf4029a\``);
        await queryRunner.query(`ALTER TABLE \`image_person\` DROP FOREIGN KEY \`FK_41b33f410c401c115103b703969\``);
        await queryRunner.query(`DROP INDEX \`IDX_22f984b92dee71af3d7daa5f82\` ON \`person_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_52aefcfd3f58e9091e43396872\` ON \`person_film\``);
        await queryRunner.query(`DROP TABLE \`person_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_afc98cd9b4ed2555ad1fda3738\` ON \`vehicles_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_5419daffae6088b3809c93cd79\` ON \`vehicles_film\``);
        await queryRunner.query(`DROP TABLE \`vehicles_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc7633a1366439bcee113a033c\` ON \`vehicles_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_8a743eebcb4295fa098b1100a5\` ON \`vehicles_person\``);
        await queryRunner.query(`DROP TABLE \`vehicles_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb5e3484f0fe0a779049c1fe3e\` ON \`starships_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_199ec4b25699908a6d507dcce1\` ON \`starships_film\``);
        await queryRunner.query(`DROP TABLE \`starships_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_a5772881beef0be99f472d608d\` ON \`starships_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_21fc491395d026eb07a518b71e\` ON \`starships_person\``);
        await queryRunner.query(`DROP TABLE \`starships_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_d558e4914b65efd642b9f66f13\` ON \`species_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_5f4a67c6e3c15e881a21a419ac\` ON \`species_person\``);
        await queryRunner.query(`DROP TABLE \`species_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_78aad5950b7e32ce123b5f3fed\` ON \`species_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_5faf4f27306eebd5a407e6c26e\` ON \`species_film\``);
        await queryRunner.query(`DROP TABLE \`species_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_95094b6b3dfb31859956d52396\` ON \`planet_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_b1dd5afead177d1c0d2d3a79b9\` ON \`planet_species\``);
        await queryRunner.query(`DROP TABLE \`planet_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_092b0534049588c9622b44874b\` ON \`planet_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_0eb506799ac4bf5f78570a2450\` ON \`planet_film\``);
        await queryRunner.query(`DROP TABLE \`planet_film\``);
        await queryRunner.query(`DROP TABLE \`film\``);
        await queryRunner.query(`DROP TABLE \`person\``);
        await queryRunner.query(`DROP TABLE \`vehicle\``);
        await queryRunner.query(`DROP TABLE \`starship\``);
        await queryRunner.query(`DROP TABLE \`species\``);
        await queryRunner.query(`DROP TABLE \`planet\``);
        await queryRunner.query(`DROP TABLE \`image_person\``);
    }
}
