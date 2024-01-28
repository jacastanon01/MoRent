import { NextResponse } from 'next/server';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { getServerAuthSession } from '@/server/auth';

const clientS3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_SUPER_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SUPER_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
});

function generateURL(key: string) {
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${key}`;
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const fromClient = searchParams.get('from');
  const filename = searchParams.get('filename');
  const user = await getServerAuthSession();

  if (!user) throw Error('user not found');

  const data = await request.formData();
  const formFile: File | null = data.get('file') as File;
  // verify file type
  const contentType = formFile.type;
  if (!contentType || !contentType.startsWith('image/')) {
    return NextResponse.json({ message: 'Invalid file type' });
  }

  // verify file size is less than 4MB
  const contentLength = request.headers.get('content-length');
  if (!contentLength || Number(contentLength) > 4e6) {
    return NextResponse.json({ message: 'Content is too large' });
  }

  const buffer = Buffer.from(await formFile.arrayBuffer());

  if (filename && request.body) {
    const uniqueName = fromClient === 'car' ? uuidv4() : user.user.id;
    const file = `${fromClient}-${uniqueName}-${filename}`;

    const params: S3.PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: file,
      Body: buffer,
      ContentType: contentType,
    };

    const url = generateURL(file);

    const uploadResponse = await clientS3.putObject(params).promise();

    return NextResponse.json({ uploadResponse, url });
  }

  return NextResponse.json({ message: 'Error' });
}
