import { ICreatePost } from "@/interfaces/post.interface";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';



export const POST = async (req: Request) => {
    try {
        const client = await clientPromise;
        const db = client.db('test-db');
        const postData: ICreatePost = await req.json();

        const postDataWithTimestamps: ICreatePost = {
            ...postData,
            updatedAt: new Date(),
            createdAt: new Date(),
            likes: 0,
            comments: []
        }
        const post = await db.collection('posts').insertOne(postDataWithTimestamps);
        const newPost = await db.collection('posts').findOne({ _id: post.insertedId });

        return NextResponse.json({
            status: true,
            message: "Post created successfully",
            data: newPost
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            message: 'Error adding currency',
            error
        });
    }
}


export const GET = async (req: Request) => {
    try {
        const client = await clientPromise;
        const db = client.db("test-db");
        const posts = await db
            .collection("posts")
            .find({})
            .sort({ _id: -1 })
            .limit(30)
            .toArray();
        return NextResponse.json({
            status: true,
            message: 'Posts fetched successfully',
            data: posts

        })
    } catch (e) {
        console.error(e);
    }
};


