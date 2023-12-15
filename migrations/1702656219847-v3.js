const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class V31702656219847 {
    name = 'V31702656219847'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`person\` ADD \`images\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`films\` \`films\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`species\` \`species\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`vehicles\` \`vehicles\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`starships\` \`starships\` json NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`starships\` \`starships\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`vehicles\` \`vehicles\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`species\` \`species\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`films\` \`films\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`images\``);
    }
}
