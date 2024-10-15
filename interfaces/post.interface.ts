import { IComment } from "./comment.interface";

export interface ICreatePost {
    title: string;
    content: string;
    author: string; // Assuming author is a string representing the author's ID
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    likes: number,
    comments: IComment[]
    image: string

}



export interface IPost extends ICreatePost {
    _id: string;

}
