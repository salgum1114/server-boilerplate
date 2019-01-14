import { IUser } from './user';

export interface IPost {
    _id: number,
    content: string,
    thumbnail: string,
    tags: Array<string>,
    user: IUser,
    title: string,
    preview: string,
    updatedAt: number,
    created: number,
    category: string,
};