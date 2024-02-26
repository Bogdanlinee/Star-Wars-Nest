const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class V51708928865859 {
    name = 'V51708928865859'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`planet\` CHANGE \`url\` \`url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`species\` CHANGE \`url\` \`url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`starship\` CHANGE \`url\` \`url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vehicle\` CHANGE \`url\` \`url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`url\` \`url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`url\` \`url\` varchar(255) NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`url\` \`url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`url\` \`url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vehicle\` CHANGE \`url\` \`url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`starship\` CHANGE \`url\` \`url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`species\` CHANGE \`url\` \`url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`planet\` CHANGE \`url\` \`url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`url\``);
    }
}
