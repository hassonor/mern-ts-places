import { Document, SortOrder } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IUserDocument extends Document {
    _id: string | ObjectId;
    authId: string | ObjectId;
    username?: string;
    email?: string;
    password?: string;
    uId?: string;
    profilePicture: string;
    createdAt?: Date;
}

export interface UserFilter {
    email?: string;
    username?: string;
    createdAt?: Date | string;
}

export type UserSort = {
    [key in keyof IUserDocument]?: SortOrder;
};

export interface IResetPasswordParams {
    username: string;
    email: string;
    ipaddress: string;
    date: string;
}

export interface IEmailJob {
    receiverEmail: string;
    template: string;
    subject: string;
}

