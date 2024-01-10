import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // verify file type
  const contentType = request.headers.get('content-type');
  if (!contentType || !contentType.startsWith('image/')) {
    return NextResponse.json({ message: 'Invalid file type' });
  }

  // verify file size is less than 4MB
  const contentLength = request.headers.get('content-length');
  if (!contentLength || Number(contentLength) > 4e6) {
    return NextResponse.json({ message: 'Content is too large' });
  }

  if (filename && request.body) {
    const blob = await put(filename, request.body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  }

  return NextResponse.json({ message: 'Error' });
}
