import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { addPlaceSchema } from '@root/features/place/schemes/place.schemes';
import { JoiValidation } from '@global/decorators/joi-validation.decorators';
import { getCoordsForAddress } from '@global/helpers/location';
import { NotFoundError } from '@global/helpers/error-handler';
import { placeQueue } from '@service/queues/place.queue';
import { ObjectId } from 'mongodb';
import { IPlaceDocument } from '@place/interfaces/place.interface';


export class Create {
    @JoiValidation(addPlaceSchema)
    public async place(req: Request, res: Response): Promise<void> {
        const {title, description, address, image, creator} = req.body;
        let coordinates;

        try {
            coordinates = await getCoordsForAddress(address);
        } catch {
            throw new NotFoundError('Could not find a place for the provided address.');
        }

        const placeObjectId: ObjectId = new ObjectId();
        const createdPlace: IPlaceDocument = {
            _id: placeObjectId,
            title,
            description,
            image,
            location: coordinates,
            address,
            creator
        } as unknown as IPlaceDocument;

        placeQueue.addPlaceJob('addPlaceToDB', createdPlace);

        res.status(HTTP_STATUS.CREATED).json({
            message: 'Place were created successfully',
            place: createdPlace
        });
    }


}