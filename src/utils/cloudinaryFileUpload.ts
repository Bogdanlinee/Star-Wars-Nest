import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: 'dkvxlz5k1',
    api_key: '428367672613777',
    api_secret: 'FWszyKa_aUYifjbY5ZrTkhLk9fU'
});

export const uploadFileCloudinary = (filePath: string, fileName: string) => new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath,
        {public_id: fileName, folder: 'star-wars'},
        async function (err, result) {
            if (err) {
                reject(null);
            }
            resolve(result);
        });
})
