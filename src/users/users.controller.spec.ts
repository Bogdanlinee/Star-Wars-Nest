import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {User} from './entities/user.entity';
import mockUser from '../mocks/user/mockUser';

describe('UsersController', () => {
    let controller: UsersController;
    const users: User[] = [];

    const fakeUsersServiceMethods = {
        create: (username: string, password: string) => {
            const user = {id: users.length + 1, username, password} as User;
            users.push(user);
            return Promise.resolve(user);
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: fakeUsersServiceMethods,
                },
            ]
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('Can add one user in DB.', async () => {
        const result = await controller.signup({
            username: mockUser.adminRole.username,
            password: mockUser.adminRole.password
        });

        expect(result.username).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.password).toBeDefined();
    });
});
