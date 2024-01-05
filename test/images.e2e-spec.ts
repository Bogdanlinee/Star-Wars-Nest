import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {deleteFileCloudinary} from '../src/utils/cloudinaryFileUpload';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Can add one image', async () => {
        return request(app.getHttpServer())
            .post(`/image/add/1`)
            .attach('file', 'uploads/1.jpg')
            .expect(201)
            .then(res => {
                deleteFileCloudinary(res.body.publicId);
            })
    });
});