import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { addPlaceSchema } from '@root/features/place/schemes/place.schemes';
import { JoiValidation } from '@global/decorators/joi-validation.decorators';
import { getCoordsForAddress } from '@global/helpers/location';
import { BadRequestError, NotFoundError } from '@global/helpers/error-handler';
import { placeQueue } from '@service/queues/place.queue';
import { ObjectId } from 'mongodb';
import { IPlaceDocument } from '@place/interfaces/place.interface';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '@global/helpers/cloudinary-upload';


export class Create {
    @JoiValidation(addPlaceSchema)
    public async place(req: Request, res: Response): Promise<void> {
        const {title, description, address, image} = req.body;
        let coordinates;

        try {
            coordinates = await getCoordsForAddress(address);
        } catch {
            throw new NotFoundError('Could not find a place for the provided address.');
        }

        const placeObjectId: ObjectId = new ObjectId();

        const result: UploadApiResponse = await uploads(image, `${placeObjectId}`, true, true) as UploadApiResponse;
        if (!result?.public_id) {
            throw new BadRequestError('File upload: Error occurred. Try again.');
        }

        const createdPlace: IPlaceDocument = {
            _id: placeObjectId,
            title,
            description,
            image,
            location: coordinates,
            address,
            creator: req.currentUser!.userId
        } as unknown as IPlaceDocument;

        placeQueue.addPlaceJob('addPlaceToDB', createdPlace);

        res.status(HTTP_STATUS.CREATED).json({
            message: 'Place were created successfully',
            place: createdPlace
        });
    }


}