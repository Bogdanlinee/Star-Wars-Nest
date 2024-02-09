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
            .attach('file', './test/testImageFolder/1.jpg')
            .expect(201)
            .then(async (res) => {
                await deleteFileCloudinary(res.body.data.image);
            })
    });

    it('Throws Error. Add one image', async () => {
        return request(app.getHttpServer())
            .post(`/image/add/1`)
            .expect(400)
    });

    it('Can delete one image', async () => {
        return request(app.getHttpServer())
            .post(`/image/add/1`)
            .attach('file', './test/testImageFolder/1.jpg')
            .expect(201)
            .then(res => {
                const image = res.body.data.image;
                const deleteImageUrl = res.body.data.publicId;
                return request(app.getHttpServer())
                    .delete('/image/delete/1')
                    .send({image})
                    .expect(200)
                    .then(async (res) => {
                        await deleteFileCloudinary(deleteImageUrl);
                    })
            })
    });
});