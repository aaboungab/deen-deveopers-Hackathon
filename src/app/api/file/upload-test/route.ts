
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob | null;

    if (!file) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'attachments',
          format: 'png', // Ensures Cloudinary saves it as a PNG
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result?.secure_url ?? '');
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({ url: uploadResult });
  } catch (error) {
    console.error('[Upload Error]', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
