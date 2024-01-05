import {diskStorage} from 'multer';
import {extname} from 'path';
import {BadRequestException} from '@nestjs/common';

const oneMb = 1000000;

const storage = diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const extension = extname(file.originalname);
        const randomName = Array(32)
            .fill(null)
            .map(() => (Math.round(Math.random() * 16)).toString(16)).join('');

        cb(null, `${name}-${randomName}${extension}`);
    }
});

const limits = {fileSize: 10 * oneMb};

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void
) => {
    const allowedMimeType = ['image/jpeg', 'image/png'];
    const mimeType = allowedMimeType.includes(file.mimetype);

    if (!mimeType) {
        return cb(new BadRequestException('Invalid image'), false);
    }

    return cb(null, true);
}

export {storage, limits, fileFilter};