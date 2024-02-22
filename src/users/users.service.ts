import {BadRequestException, Injectable} from '@nestjs/common';
import {randomBytes, scrypt as _scrypt} from 'crypto';
import {promisify} from 'util';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {ChangeRoleDto} from './dto/change-role-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>) {
    }

    async findOne(username: string) {
        return await this.usersRepository.findOne({
            where: {username}
        });
    }

    async create(username: string, pass: string) {
        const user = await this.findOne(username);

        if (user) throw new BadRequestException('Email already in use');

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(pass, salt, 32)) as Buffer;
        const hashedPassword = `${salt}.${hash.toString('hex')}`;

        return await this.usersRepository.save({username, password: hashedPassword});
    }

    async changeRole(changeRoleDto: ChangeRoleDto) {
        const user = this.usersRepository.findOne({
            where: {username: changeRoleDto.username}
        });

        if (!user) throw new BadRequestException('No such user!');

        await this.usersRepository.save({...user, role: changeRoleDto.role});

        return;
    }
}