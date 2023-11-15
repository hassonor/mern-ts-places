import mongoose, { Document } from 'mongoose';


export interface IPlaceDocument extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    location: {
        lat: number;
        lng: number;
    },
    address: string;
    creator: mongoose.Types.ObjectId;
    createdAt: Date;
}