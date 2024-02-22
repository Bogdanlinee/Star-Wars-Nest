const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class V41708582780733 {
    name = 'V41708582780733'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'user'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }
}
