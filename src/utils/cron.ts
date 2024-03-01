import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {exec} from 'child_process';

@Injectable()
export class CronService {
    @Cron(CronExpression.EVERY_2_HOURS)
    handleCron() {
        console.log('Called every 10th second of each minute');

        const dbBackupCommand = () => {
            const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
            const backupPath = 'dbBackup';
            const backupFileName = `Star_Wars_${timestamp}.sql`;
            return `mysqldump -h localhost -u root -proot Star_Wars> ${backupPath}/${backupFileName}`;
        }

        exec(dbBackupCommand(), async (error, stdout, stderr) => {
            if (error) {
                throw Error('Something wrong with cron: ' + error);
            } else {
                console.log('Database backup created successfully');
            }
        });
    }
}