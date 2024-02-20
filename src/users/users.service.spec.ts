import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from './users.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {BadRequestException} from '@nestjs/common';

describe('UsersService', () => {
    let service: UsersService;
    let users: User[] = [];
    const fakeRepositoryMethods = {
        findOne: (searchObj: { where: { username: string } }) => {
            const username = searchObj.where.username;
            const result = users.find(item => item.username === username);
            return result ? Promise.resolve(result) : Promise.resolve(null);
        },
        save: ({...userData}: Partial<User>) => {
            const user = {
                id: users.length + 1,
                username: userData.username,
                password: userData.password
            } as User;
            users.push(user);
            return Promise.resolve(user);
        },

    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: UsersService,
                    useClass: UsersService,
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: fakeRepositoryMethods,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('Can create one user', async () => {
        const result = await service.create(testUserEntity.username, testUserEntity.password);
        const [salt, hash] = result.password.split('.');

        console.log(result);

        expect(result).toHaveProperty('username');
        expect(result).toHaveProperty('password');
        expect(result).toHaveProperty('id');
        expect(result.password).not.toEqual(testUserEntity.password);
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('Throws Error. Can add one user to DB.', async () => {
        await expect(service.create(testUserEntity.username, testUserEntity.password))
            .rejects.toThrow(BadRequestException);
    });

    const testUserEntity: Omit<User, 'id'> = {
        username: 'testName',
        password: 'testPass',
    }
});
