// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm } from 'formidable'
import { v2 as cloudinary } from 'cloudinary';

import { NextResponse } from 'next/server'

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


export const POST = async (req: Request, res: NextApiResponse) => {

    try {
        const { data } = await req.json();

        if (!data) {
            return NextResponse.json({ error: 'Missing file data' });
        }
        const uploadResponse = await cloudinary.uploader.upload(data, {
            upload_preset: 'midecodes', // Optional: Configure in Cloudinary's Dashboard
        });

        return NextResponse.json({ url: uploadResponse.secure_url });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error, });
    }

}
