module.exports = class V81709619561287 {
    name = 'V81709619561287'

    async up(queryRunner) {
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '1'
                                 WHERE (\`id\` = '1')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '14'
                                 WHERE (\`id\` = '3')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '23'
                                 WHERE (\`id\` = '4')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '24'
                                 WHERE (\`id\` = '5')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '28'
                                 WHERE (\`id\` = '6')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '29'
                                 WHERE (\`id\` = '7')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '31'
                                 WHERE (\`id\` = '8')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '7'
                                 WHERE (\`id\` = '9')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '33'
                                 WHERE (\`id\` = '10')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '18'
                                 WHERE (\`id\` = '11')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '8'
                                 WHERE (\`id\` = '12')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '34'
                                 WHERE (\`id\` = '13')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '35'
                                 WHERE (\`id\` = '14')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '37'
                                 WHERE (\`id\` = '15')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '38'
                                 WHERE (\`id\` = '16')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '39'
                                 WHERE (\`id\` = '17')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '40'
                                 WHERE (\`id\` = '18')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '41'
                                 WHERE (\`id\` = '19')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '43'
                                 WHERE (\`id\` = '20')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '44'
                                 WHERE (\`id\` = '21')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '45'
                                 WHERE (\`id\` = '22')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '46'
                                 WHERE (\`id\` = '23')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '47'
                                 WHERE (\`id\` = '24')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '48'
                                 WHERE (\`id\` = '25')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '49'
                                 WHERE (\`id\` = '26')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '50'
                                 WHERE (\`id\` = '27')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '11'
                                 WHERE (\`id\` = '28')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '51'
                                 WHERE (\`id\` = '29')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '54'
                                 WHERE (\`id\` = '30')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '55'
                                 WHERE (\`id\` = '31')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '10'
                                 WHERE (\`id\` = '32')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '56'
                                 WHERE (\`id\` = '33')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '57'
                                 WHERE (\`id\` = '34')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '58'
                                 WHERE (\`id\` = '35')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '59'
                                 WHERE (\`id\` = '36')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = '12'
                                 WHERE (\`id\` = '37')`);
    }

    async down(queryRunner) {
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '1')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '2')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '3')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '4')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '5')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '6')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '7')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '8')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '9')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '10')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '11')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '12')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '13')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '14')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '15')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '16')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '17')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '18')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '19')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '20')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '21')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '22')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '23')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '24')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '25')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '26')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '27')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '28')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '29')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '30')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '31')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '32')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '33')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '34')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '35')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '36')`);
        await queryRunner.query(`UPDATE \`species\`
                                 SET \`homeworld\` = null
                                 WHERE (\`id\` = '37')`);
    }
}
