import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { placeService } from '@service/db/place.service';
import { BadRequestError } from '@global/helpers/error-handler';
import { placeQueue } from '@service/queues/place.queue';


export class Delete {

    public async place(req: Request, res: Response): Promise<void> {
        const placeId = req.params.placeId;

        const place = await placeService.getPlaceById(placeId);

        if (!place) {
            throw new BadRequestError('Place not found, could not be deleted.');
        }

        placeQueue.addPlaceJob('deletePlaceInDB', {
            placeId: placeId
        });

        res.status(HTTP_STATUS.NO_CONTENT).json({
            message: 'Place were deleted successfully'
        });
    }


}