
export interface ICreateComment {
    comment: string;
    user: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface IComment extends ICreateComment {
    _id: string;
}

