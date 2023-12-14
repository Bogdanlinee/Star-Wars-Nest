const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class V11702545914350 {
    name = 'V11702545914350'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`homeworld\` varchar(255) NOT NULL, \`films\` json NOT NULL, \`species\` json NOT NULL, \`vehicles\` json NOT NULL, \`starships\` json NOT NULL, \`created\` timestamp NOT NULL, \`edited\` timestamp NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`person\``);
    }
}
