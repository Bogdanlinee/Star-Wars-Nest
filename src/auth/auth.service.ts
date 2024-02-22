import {BadRequestException, Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {scrypt as _scrypt} from 'crypto';
import {promisify} from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (!user) return null;

        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(pass, salt, 32) as Buffer);
        const {password, ...result} = user;

        if (storedHash !== hash.toString('hex')) throw new BadRequestException('Wrong password!');

        return result;
    }
}