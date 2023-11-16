import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { addPlaceSchema } from '@root/features/place/schemes/place.schemes';
import { JoiValidation } from '@global/decorators/joi-validation.decorators';
import { getCoordsForAddress } from '@global/helpers/location';
import { NotFoundError } from '@global/helpers/error-handler';


export class Create {
    @JoiValidation(addPlaceSchema)
    public async place(req: Request, res: Response): Promise<void> {
        const {title, description, address, creator} = req.body;
        let coordinates;
        
        try {
            coordinates = await getCoordsForAddress(address);
        } catch {
            throw new NotFoundError('Could not find a place for the provided address.');
        }


        const createdPlace = {
            id: uuidv4(),
            title,
            description,
            location: coordinates,
            address,
            creator
        };

        //TODO: add to the DB...

        res.status(HTTP_STATUS.CREATED).json({
            message: 'Place were created successfully',
            place: createdPlace
        });
    }


}