// import { v2 as cloudinary } from 'cloudinary';
// import { NextRequest } from 'next/server';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// export async function POST(req: NextRequest) {
//   const formData = await req.formData();
//   const file = formData.get('file') as File | null;

//   if (!file) {
//     return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
//   }

//   const arrayBuffer = await file.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);

//   const upload = await new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder: 'attachments', resource_type: 'auto' },
//       (err, result) => {
//         if (err) reject(err);
//         else resolve(result);
//       }
//     );

//     stream.end(buffer); // send buffer to stream
//   });

//   console.log("uploaded-url", (upload as any).secure_url)

//   return new Response(JSON.stringify({ url: (upload as any).secure_url }), { status: 200 });
// }





import { v2 as cloudinary } from 'cloudinary';
import { NextRequest } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll('files') as File[];

  if (!files.length) {
    return new Response(JSON.stringify({ error: 'No files uploaded' }), { status: 400 });
  }

  const uploads = await Promise.all(
    files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'attachments', resource_type: 'auto' },
          (err, result) => {
            if (err) reject(err);
            else resolve({
              url: result?.secure_url,
              type: result?.resource_type,
              mimeType: result?.format,
              size: result?.bytes,
              originalFilename: result?.original_filename,
              publicId: result?.public_id,
            });
          }
        );
        stream.end(buffer);
      });
    })
  );

  return new Response(JSON.stringify({ uploads }), { status: 200 });
}
