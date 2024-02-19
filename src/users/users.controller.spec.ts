import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';

describe('UsersController', () => {
    let controller: UsersController;
    const users = [];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        create: () => {
                        },
                    },
                },
            ]
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('Can add one user in DB.', async () => {
        jest.spyOn(controller['usersService'], 'create').mockResolvedValue(testUserEntity);
        const result = await controller.signup(testUserEntity);
        users.push(testUserEntity);
        expect(result).toEqual(testUserEntity);
    });

    const testUserEntity = {
        id: 1,
        username: 'Dan@test.test3',
        password: 'testpass',
    };
});
