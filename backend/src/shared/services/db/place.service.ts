import { PlaceModel } from '@place/models/place.schema';
import { IPlaceDocument } from '@place/interfaces/place.interface';

class PlaceService {
    public async createPlace(data: IPlaceDocument): Promise<void> {
        await PlaceModel.create(data);
    }

    public async getPlaceById(id: string): Promise<IPlaceDocument | null> {
        const place = await PlaceModel.findById(id).exec();
        return place;
    }

    public async updatePlace(id: string, updateData: Partial<IPlaceDocument>): Promise<IPlaceDocument | null> {
        const updatedPlace = await PlaceModel.findByIdAndUpdate(id, updateData, {new: true}).exec();
        return updatedPlace;
    }

    public async placesByUserId(userId: string): Promise<IPlaceDocument[]> {
        const places = await PlaceModel.find({creator: userId}).exec();
        return places;
    }
}

export const placeService: PlaceService = new PlaceService();