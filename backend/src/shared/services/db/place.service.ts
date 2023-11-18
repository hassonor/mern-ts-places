import { PlaceModel } from '@place/models/place.schema';
import { IPlaceDocument, PlaceSort } from '@place/interfaces/place.interface';
import { FilterQuery } from 'mongoose';

class PlaceService {
    public async createPlace(data: IPlaceDocument): Promise<void> {
        await PlaceModel.create(data);
    }

    public async getPlaceById(id: string): Promise<IPlaceDocument | null> {
        const place = await PlaceModel.findById(id).exec();
        return place ? place?.toObject({getters: true}) : place;
    }

    public async updatePlace(id: string, updateData: Partial<IPlaceDocument>): Promise<IPlaceDocument | null> {
        const updatedPlace = await PlaceModel.findByIdAndUpdate(id, updateData, {new: true}).exec();
        return updatedPlace;
    }

    public async placesByUserId(userId: string): Promise<IPlaceDocument[]> {
        const places = await PlaceModel.find({creator: userId}).exec();
        return places.map(place => place.toObject({getters: true}));
    }

    public async deletePlace(id: string): Promise<IPlaceDocument | null> {
        const deletedPlace = await PlaceModel.findByIdAndDelete(id).exec();
        return deletedPlace;
    }

    public async getAllPlaces(
        page: number,
        limit: number,
        sort: PlaceSort = {},
        filter: FilterQuery<IPlaceDocument> = {}
    ): Promise<{ places: IPlaceDocument[], total: number }> {
        const skip = (page - 1) * limit;
        const query = PlaceModel.find(filter);
        const total = await PlaceModel.countDocuments(filter);

        query.skip(skip).limit(limit);

        if (Object.keys(sort).length) {
            query.sort(sort);
        }

        let places = await query.exec();

        places = places.map(place => place.toObject({getters: true}));

        return {places, total};
    }
}

export const placeService: PlaceService = new PlaceService();