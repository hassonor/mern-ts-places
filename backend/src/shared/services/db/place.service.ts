import { PlaceModel } from '@place/models/place.schema';
import { IPlaceDocument } from '@place/interfaces/place.interface';

class PlaceService {
    public async createPlace(data: IPlaceDocument): Promise<void> {
        await PlaceModel.create(data);
    }

    public async getPostById(id: string): Promise<IPlaceDocument> {
        const post = (await PlaceModel.findById(id).exec()) as IPlaceDocument;
        return post;
    }

    public async placesByUserId(userId: string): Promise<IPlaceDocument[]> {
        const places = (await PlaceModel.find({creator: userId}).exec()) as IPlaceDocument[];
        return places;
    }
}


export const placeService: PlaceService = new PlaceService();