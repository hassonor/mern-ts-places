import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { updatePlaceSchema } from '@root/features/place/schemes/place.schemes';
import { JoiValidation } from '@global/decorators/joi-validation.decorators';
import { placeService } from '@service/db/place.service';
import { BadRequestError, NotAuthorizedError } from '@global/helpers/error-handler';
import { placeQueue } from '@service/queues/place.queue';

export class Update {
    @JoiValidation(updatePlaceSchema)
    public async place(req: Request, res: Response): Promise<void> {
        const {title, description} = req.body;
        const placeId = req.params.placeId;

        const place = await placeService.getPlaceById(placeId);

        if (!place) {
            throw new BadRequestError('Place not found, could not update.');
        }

        if (place?.creator.toString() !== req.currentUser!.userId) {
            throw new NotAuthorizedError('You are not authorized to update this.');
        }

        placeQueue.addPlaceJob('updatePlaceInDB', {
            placeId: placeId,
            updateData: {title, description}
        });

        const updatedPlacePreview = {
            ...place,
            title,
            description
        };

        res.status(HTTP_STATUS.OK).json({
            message: 'Update placed successfully',
            place: updatedPlacePreview
        });
    }
}