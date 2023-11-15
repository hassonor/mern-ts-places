import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IUserDocument extends Document {
    _id: string | ObjectId;
    authId: string | ObjectId;
    username?: string;
    email?: string;
    password?: string;
    uId?: string;
    createdAt?: Date;
}

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

