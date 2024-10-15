import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db('test-db'); // Replace with your actual database name

        // Validate and convert the post ID to ObjectId
        const { id } = params;
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid Post ID' }, { status: 400 });
        }

        // Increment the likes count by 1
        const result = await db.collection('posts').updateOne(
            { _id: new ObjectId(id) }, // Find the post by _id
            { $inc: { likes: 1 } } // Increment the 'likes' field by 1
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: 'Post not found or like not added' }, { status: 404 });
        }

        // Return success response
        return NextResponse.json({ message: 'Post liked successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error liking post', error }, { status: 500 });
    }
}
