import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {User} from '../users/entities/user.entity';
import {UsersService} from '../users/users.service';
import {BadRequestException} from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    const users: User[] = [
        {
            id: 1,
            username: 'testName',
            password: '1374feb17851c1aa.8bda91878b548f0ff27249183fc5b8837e57fed4bd2c9b0a4830156d347ae904'
        }
    ];
    const fakeUserServiceMethods = {
        findOne: (username: string) => {
            const result = users.find(item => item.username === username);
            return result ? Promise.resolve(result) : Promise.resolve(null);
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: AuthService,
                    useClass: AuthService,
                },
                {
                    provide: UsersService,
                    useValue: fakeUserServiceMethods,
                }
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('Can authorize user with a valid password.', async () => {
        const result = await service.validateUser(testUserEntity.username, testUserEntity.password);

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.username).toBeDefined();
    });

    it('Can not find user in DB.', async () => {
        const result = await service.validateUser('No such user', testUserEntity.password);
        expect(result).toBeNull();
    });

    it('Throws Error. User provided invalid password', async () => {
        await expect(service.validateUser(testUserEntity.username, 'Invalid Password'))
            .rejects.toThrow(BadRequestException);
    });

    const testUserEntity: Omit<User, 'id'> = {
        username: 'testName',
        password: 'testPass',
    }
});
