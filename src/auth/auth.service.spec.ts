import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {User} from '../users/entities/user.entity';
import {UsersService} from '../users/users.service';
import {BadRequestException} from '@nestjs/common';
import mockUser from '../mocks/user/mockUser';
import mockUserEntity from '../mocks/user/mockUserEntity';

describe('AuthService', () => {
    let service: AuthService;
    // const userEntity = mockUser.userRole;
    const userEntity = mockUser.userRole;
    const users: User[] = [
        mockUserEntity
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
        const result = await service.validateUser(mockUserEntity.username, userEntity.originPass);

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.username).toBeDefined();
    });

    it('Can not find user in DB.', async () => {
        const result = await service.validateUser('No such user', userEntity.originPass);
        expect(result).toBeNull();
    });

    it('Throws Error. User provided invalid password', async () => {
        await expect(service.validateUser(mockUserEntity.username, 'Invalid Password'))
            .rejects.toThrow(BadRequestException);
    });
});
