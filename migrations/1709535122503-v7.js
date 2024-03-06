const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class V71709535122503 {
    name = 'V71709535122503'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`species\` DROP COLUMN \`homeworld\``);
        await queryRunner.query(`ALTER TABLE \`species\` ADD \`homeworld\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD CONSTRAINT \`FK_609aca3a2f74ce1bc351251be75\` FOREIGN KEY (\`homeworld\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`species\` DROP FOREIGN KEY \`FK_609aca3a2f74ce1bc351251be75\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP COLUMN \`homeworld\``);
        await queryRunner.query(`ALTER TABLE \`species\` ADD \`homeworld\` varchar(255) NULL`);
    }
}
