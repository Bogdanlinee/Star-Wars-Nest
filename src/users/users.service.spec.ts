import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from './users.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DeepPartial, Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {BadRequestException, NotFoundException} from '@nestjs/common';
import {json} from 'express';

describe('UsersService', () => {
    let service: UsersService;
    let userRepository: Repository<User>;
    let users: User[] = [];
    let fakeUsersService: Partial<UsersService>;


    beforeEach(async () => {
        fakeUsersService = {
            findOne: (username: string) => {
                const result = users.find(item => item.username === username);
                return result ? Promise.resolve(result) : Promise.resolve(null);
            },
            create: (username: string, password: string) => {
                const user = {id: users.length, username, password} as User;
                users.push(user);
                return Promise.resolve(user);
            },

        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                },
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('Can create one user', async () => {
        const user = {
            username: 'testName',
            password: 'testPass',
            id: users.length + 1,
        }

        // jest.spyOn(userRepository, 'findOne').mockImplementation(async (test) => {
        //     const result = users.find(item => item.username === test);
        //     return result ? result : null;
        // });
        // jest.spyOn(userRepository, 'create').mockReturnValue(user);
        // jest.spyOn(userRepository, 'save').mockResolvedValue(Promise.resolve(user));
        // jest.spyOn(service, 'create').mockReturnValue((username: string, password: string) => {
        //     const user = {id: users.length, username, password} as User;
        //     console.log(user);
        //     users.push(user);
        //     return Promise.resolve(user);
        // })

        const result = await service.create(user.username, user.password);

        console.log(result)

        // expect(result).toBeDefined();
        // expect(result).toHaveProperty('username');
        // expect(result).toHaveProperty('id');
    });

    // it('Throws Error. Can add one user to DB.', async () => {
    //     const user = {
    //         username: 'testName',
    //         password: 'testPass',
    //         id: users.length + 1,
    //     }
    //
    //     jest.spyOn(userRepository, 'findOne').mockImplementation(async (test) => {
    //         const result = users.find(item => item.username === test);
    //         return result ? result : null;
    //     });
    //     jest.spyOn(userRepository, 'create').mockReturnValue(user);
    //     jest.spyOn(userRepository, 'save').mockReturnValue(Promise.resolve(user));
    //
    //     await expect(service.create(user.username, user.password)).rejects.toThrow(BadRequestException);
    // });
});
