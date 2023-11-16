import mongoose, { Document } from 'mongoose';


export interface IPlaceDocument extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    location: {
        lat: number;
        lng: number;
    },
    image: string
    address: string;
    creator: mongoose.Types.ObjectId | string;
    createdAt: Date;
}

export interface IPlaceData {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    location: {
        lat: number;
        lng: number;
    },
    image: string
    address: string;
    creator: mongoose.Types.ObjectId | string;
}

export interface IPlaceUpdateDeleteJob {
    placeId: string | mongoose.Types.ObjectId;
    updateData?: {
        title?: string;
        description?: string;
    }
}



