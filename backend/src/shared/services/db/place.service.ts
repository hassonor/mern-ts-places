import { PlaceModel } from '@place/models/place.schema';
import { IPlaceDocument } from '@place/interfaces/place.interface';

class PlaceService {
    public async createPlace(data: IPlaceDocument): Promise<void> {
        await PlaceModel.create(data);
    }
}


export const placeService: PlaceService = new PlaceService();