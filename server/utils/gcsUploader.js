import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, existsSync, unlinkSync } from 'fs';
import crypto from 'crypto';


const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);


storage = new Storage();

const bucketName = process.env.GOOGLE_BUCKET_NAME;


const bucket = storage.bucket(bucketName);

export const uploadToGCS = (localPath, originalName, userId) => {
    console.log('uploadToGCS called with:', localPath, originalName);
    const uniqueName = `${userId}/${Date.now()}-${crypto.randomBytes(6).toString('hex')}-${originalName}`;
    const file = bucket.file(uniqueName);

    return new Promise((resolve, reject) => {
        const stream = createReadStream(localPath).pipe(
            file.createWriteStream({
                resumable: false,
                gzip: true,
                metadata: {
                    contentType: 'application/pdf',
                },
            })
        );

        stream.on('error', (err) => {
            console.error("Upload error:", JSON.stringify(err, null, 2));
            reject(new Error(`Upload failed: ${err.message}`));
        });

        stream.on('finish', () => {
            if (existsSync(localPath)) {
                unlinkSync(localPath);
            }
            (async () => {
                try {
                    const [signedUrl] = await file.getSignedUrl({
                        action: 'read',
                        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
                    });

                    console.log("Generated signed URL:", signedUrl);
                    resolve({ signedUrl, objectName: uniqueName });

                    await fs.unlink(localPath);
                } catch (err) {
                    console.error("Signed URL error:", JSON.stringify(err, null, 2));
                    reject(new Error(`Signed URL generation failed: ${err.message}`));
                } finally {
                    if (localPath) {
                        if (existsSync(localPath)) {
                            try {
                                await unlinkSync(localPath);
                                console.log('Local file deleted:', localPath);
                            } catch (cleanupErr) {
                                console.warn('failed to delete local file: ', cleanupErr);
                            }
                        }
                    }
                }
            })();
        });
    });
};


export const deleteFromGCS = async (objectName) => {
    const file = bucket.file(objectName);
    await file.delete();
};