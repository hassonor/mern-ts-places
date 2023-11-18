import { PlaceModel } from '@place/models/place.schema';
import { IPlaceDocument, PlaceSort } from '@place/interfaces/place.interface';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { IUserDocument } from '@user/interfaces/user.interface';
import { UserModel } from '@user/models/user.schema';

class PlaceService {
    public async createPlace(data: IPlaceDocument): Promise<void> {
        const place = await PlaceModel.create(data);
        const user: UpdateQuery<IUserDocument> = await UserModel.updateOne({_id: data.creator}, {$addToSet: {places: data._id}});

        await Promise.all([place, user]);
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

    public async deletePlace(userId: string, placeId: string): Promise<void> {
        const deletePlace = await PlaceModel.findByIdAndDelete(placeId);
        const deletePlaceFromUser = await UserModel.findByIdAndUpdate(userId, {$pull: {places: placeId}});
        await Promise.all([deletePlace, deletePlaceFromUser]);
    }

    public async getAllPlaces(
        page: number,
        limit: number,
        sort: PlaceSort = {},
        filter: FilterQuery<IPlaceDocument> = {}
    ): Promise<{
        places: IPlaceDocument[],
        total: number
    }> {
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