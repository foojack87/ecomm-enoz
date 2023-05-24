import { NextResponse } from 'next/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { isAdminRequest } from '../auth/[...nextauth]/route';
import mime from 'mime-types';
const bucketName = 'ecomm-enoz';

export async function POST(request) {
  await isAdminRequest();
  const formData = await request.formData();
  const files = formData.getAll('file');

  if (files) {
    console.log(files, files.length);

    const client = new S3Client({
      region: 'ap-southeast-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    const links = [];

    for (const file of files) {
      const ext = file.name.split('.').pop();
      const newFilename = Date.now() + '.' + ext;
      const fileBuffer = await file.arrayBuffer();
      const fileData = Buffer.from(fileBuffer);
      console.log({ ext, file });

      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newFilename,
          Body: fileData,
          ACL: 'public-read',
          ContentType: mime.lookup(file),
          ContentDisposition: 'inline',
        })
      );

      const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
      links.push(link);
    }
    return NextResponse.json({ links });
  }
}
