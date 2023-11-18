import mongoose, { Document, SortOrder } from 'mongoose';


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


export type PlaceSort = {
    [key in keyof IPlaceDocument]?: SortOrder;
} & {
    'location.lat'?: SortOrder;
    'location.lng'?: SortOrder;
};

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
    userId?: string | mongoose.Types.ObjectId;
    updateData?: {
        title?: string;
        description?: string;
    }
}



