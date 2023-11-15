import { model, Model, Schema } from 'mongoose';
import { IPlaceDocument } from '@root/features/place/interfaces/place.interface';


const placeSchema: Schema = new Schema({
    title: String,
    description: String,
    location: {
        lat: Number,
        lng: Number
    },
    address: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const PlaceModel: Model<IPlaceDocument> = model<IPlaceDocument>('Place', placeSchema, 'Place');
export { PlaceModel };