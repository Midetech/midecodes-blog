import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        // Parse request body to extract comment details
        const { user, comment } = await request.json();

        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db('test-db'); // Replace with your actual database name

        // Validate and convert the post ID to ObjectId
        const { id } = params;
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid Post ID' }, { status: 400 });
        }

        // Create the comment object
        const newComment = {
            _id: new ObjectId(), // Generate a new ID for the comment
            user,
            comment,
            createdAt: new Date()
        };

        const post = await db.collection('posts').findOne({ _id: new ObjectId(id) }); // Find the post by _id
        if (!post) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }

        const result = await db.collection('posts').updateOne(
            { _id: new ObjectId(id) }, // Find the post by _id
            { $set: { comments: [...post.comments, newComment] } } // Set the comments array with the new comment added
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: 'Post not found or comment not added' }, { status: 404 });
        }

        // Return success response
        return NextResponse.json({ message: 'Comment added successfully', newComment });
    } catch (error) {
        return NextResponse.json({ message: 'Error adding comment', error }, { status: 500 });
    }
}
