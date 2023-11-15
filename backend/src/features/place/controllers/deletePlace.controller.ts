import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';


export class Delete {

    public async place(req: Request, res: Response): Promise<void> {
        const placeId = req.params.placeId;

        //TODO: delete from the DB...

        res.status(HTTP_STATUS.OK).json({
            message: 'Place were deleted successfully'
        });
    }


}