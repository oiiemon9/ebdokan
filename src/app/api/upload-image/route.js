import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Missing Cloudinary environment variables.');
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

function getErrorMessage(error) {
  if (!error) return 'Unknown upload error';
  if (typeof error === 'string') return error;
  if (error.message) return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return 'Unknown upload error';
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'eb-dokan/product-descriptions',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      uploadStream.end(buffer);
    });

    if (!uploadResult || !uploadResult.secure_url) {
      return NextResponse.json(
        { error: 'Cloudinary upload returned no secure_url' },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('Cloudinary upload failed:', message, error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
