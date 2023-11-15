import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { updatePlaceSchema } from '@root/features/place/schemes/place.schemes';
import { JoiValidation } from '@global/decorators/joi-validation.decorators';
import { DUMMY_PLACES } from '@place/controllers/getPlaces.controller';


export class Update {
    @JoiValidation(updatePlaceSchema)
    public async place(req: Request, res: Response): Promise<void> {
        const {title, description} = req.body;
        const placeId = req.params.placeId;

        const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)};
        const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
        updatedPlace.title = title;
        updatedPlace.description = description;

        (DUMMY_PLACES as unknown as any)[placeIndex] = updatedPlace;
        //TODO: update  the DB...

        res.status(HTTP_STATUS.OK).json({
            message: 'Place were updated successfully',
            place: updatedPlace
        });
    }


}