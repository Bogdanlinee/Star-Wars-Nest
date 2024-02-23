import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import mockUsers from '../src/mocks/user/mockUser';

describe('AppController (e2e)', () => {
    const userRoleUser = {
        username: mockUsers.userRole.username,
        password: mockUsers.userRole.originPass,
    }
    const adminRoleUser = {
        username: mockUsers.adminRole.username,
        password: mockUsers.adminRole.originPass,
    }
    const getUserCookie = async (userCredentials: { username: string, password: string }) => {
        const loginRequest = await request(app.getHttpServer())
            .post('/users/signin')
            .send(userCredentials)
        return loginRequest.get('Set-Cookie');
    }
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Can add one image', async () => {
        const loginCookie = await getUserCookie(userRoleUser);

        return request(app.getHttpServer())
            .post(`/image/add/1`)
            .set('Cookie', loginCookie)
            .attach('file', './test/testImageFolder/1.jpg')
            .expect(201)
    });

    it('Throws Error. Add one image', async () => {
        const loginCookie = await getUserCookie(userRoleUser);
        return request(app.getHttpServer())
            .post(`/image/add/1`)
            .set('Cookie', loginCookie)
            .expect(400)
    });

    it('Can delete one image', async () => {
        const loginCookie = await getUserCookie(userRoleUser);
        return request(app.getHttpServer())
            .post(`/image/add/1`)
            .attach('file', './test/testImageFolder/1.jpg')
            .set('Cookie', loginCookie)
            .expect(201)
            .then(res => {
                const image = res.body.data.image;
                return request(app.getHttpServer())
                    .delete('/image/delete/1')
                    .set('Cookie', loginCookie)
                    .send({image})
                    .expect(200)
            })
    });
});